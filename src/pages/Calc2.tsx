import { useState, useEffect, ChangeEvent } from 'react';

interface RateDetail {
  label: string;
  rate: number;
}

interface PeriodRate {
  period: number;
  rates: RateDetail[];
}

interface KeyValues {
  termDepositAmt: number;
  buyRate: number;
  sellRate: number;
  rates: PeriodRate[];
}

export default function Calc2() {
  const defaultRates = [
    {
      period: 1,
      rates: [
        { label: 'regular', rate: 0.0185 },
        { label: 'special', rate: 0.04 },
      ],
    },
    {
      period: 3,
      rates: [
        { label: 'regular', rate: 0.0185 },
        { label: 'special', rate: 0.036 },
      ],
    },
    {
      period: 6,
      rates: [
        { label: 'regular', rate: 0.0185 },
        { label: 'special', rate: 0.036 },
      ],
    },
    {
      period: 12,
      rates: [
        { label: 'regular', rate: 0.0185 },
        { label: 'special', rate: 0.036 },
      ],
    },
  ];

  const storedResults = window.localStorage.getItem('calc2data');
  const kv: KeyValues = storedResults ? JSON.parse(storedResults) : { termDepositAmt: 0, buyRate: 0, sellRate: 0 };

  const [rates, setRates] = useState<PeriodRate[]>(kv.rates ?? defaultRates);
  const [termDepositAmt, setTermDepositAmt] = useState<number>(kv.termDepositAmt);
  const [buyRate, setBuyRate] = useState<number>(kv.buyRate);
  const [sellRate, setSellRate] = useState<number>(kv.sellRate);

  const [buyRateAmt, setByRateAmt] = useState<number>(0);
  const [sellRateAmt, setSellRateAmt] = useState<number>(0);

  const [sellBuyLossAmt, setSellBuyLossAmt] = useState<number>(0);

  const handleAddPeriod = (newPeriod: number) => {
    rates.push({
      period: newPeriod,
      rates: [
        { label: 'regular', rate: 0.0185 },
        { label: 'special', rate: 0.036 },
      ],
    });
    setRates([...rates]);
  };

  const handleRemovePeriod = (i: number) => {
    rates.splice(i, 1);
    setRates([...rates]);
  };

  const handleAddRate = (i: number, newLabel: string, newRateValue: number) => {
    rates[i].rates.push({ label: newLabel, rate: newRateValue / 100 });
    setRates([...rates]);
  };

  const handleRemoveRate = (i: number, j: number) => {
    rates[i].rates.splice(j, 1);
    setRates([...rates]);
  };

  const handleChangeBuyRate = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyRate(Number.parseFloat(e.target.value) || 0);
  };
  const handleChangeSellRate = (e: ChangeEvent<HTMLInputElement>) => {
    setSellRate(Number.parseFloat(e.target.value) || 0);
  };

  const updateSellRateAmt = () => {
    const v = sellRate * termDepositAmt;
    setSellRateAmt(Number.parseFloat(v.toFixed(5)));
  };

  const updateBuyRateAmt = () => {
    const v = buyRate * termDepositAmt;
    setByRateAmt(Number.parseFloat(v.toFixed(5)));
  };

  const updateSellBuyLossAmt = () => {
    const v = (buyRate - sellRate) * termDepositAmt;
    setSellBuyLossAmt(Number.parseFloat(v.toFixed(5)));
  };

  useEffect(updateSellRateAmt, [termDepositAmt, sellRate]);

  useEffect(updateBuyRateAmt, [termDepositAmt, buyRate]);

  useEffect(() => {
    updateSellBuyLossAmt();
    if (termDepositAmt >= 0 || buyRate >= 0 || sellRate >= 0 || rates.length > 0) {
      window.localStorage.setItem(
        'calc2data',
        JSON.stringify({
          termDepositAmt: termDepositAmt ?? 0,
          buyRate: buyRate ?? 0,
          sellRate: sellRate ?? 0,
          rates: rates ?? defaultRates,
        }),
      );
    }
  }, [termDepositAmt, sellRate, buyRate, rates]);

  return (
    <>
      <article>
        <h4>Sell and Buy term deposit</h4>
        <div>Deposit amount</div>
        <input
          type="number"
          defaultValue={termDepositAmt == 0 ? '' : termDepositAmt}
          onChange={(e) => {
            setTermDepositAmt(Number.parseFloat(e.target.value) || 0);
          }}
        />
        <div>Sell Rate </div>
        <input type="number" defaultValue={sellRate} onChange={handleChangeSellRate} /> * {termDepositAmt} ={' '}
        {sellRateAmt}
        <div>Buy Rate </div>
        <input type="number" defaultValue={buyRate} onChange={handleChangeBuyRate} /> * {termDepositAmt} = {buyRateAmt}
        <br />
        (Loss: {sellBuyLossAmt})
        <br />
        <br />
        {rates.map((r, i) => (
          <div style={{ border: '1px solid white', padding: '0px 10px 15px 10px', margin: '3px 0' }} key={r.period}>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{r.period}m</span>{' '}
              <button
                style={{ margin: '0px 3px', background: 'none' }}
                onClick={() => {
                  handleRemovePeriod(i);
                }}
              >
                🗑️
              </button>
            </div>
            {r.rates.map(({ label, rate }, j) => {
              const term = Number(r.period);
              const interestAmtPerMonth = Number.parseFloat(((termDepositAmt * rate) / 12).toPrecision(5));
              const interestAmtAfterTerm = Number.parseFloat((interestAmtPerMonth * term).toPrecision(5));

              // const sellAmtAfterTermDone = interestAmtAfterTerm * sellRate;

              return (
                <div key={r.period + rate}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>
                      [{label}] {(rate * 100).toFixed(3)}%
                    </span>
                    <button
                      style={{ margin: '0px 3px', background: 'none' }}
                      onClick={() => {
                        handleRemoveRate(i, j);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                  {termDepositAmt} * {rate} = {interestAmtAfterTerm} ({interestAmtPerMonth} per month){' '}
                  {label != 'regular' ? (
                    <span>
                      ({interestAmtAfterTerm * sellRate} - {sellBuyLossAmt} ={' '}
                      {interestAmtAfterTerm * sellRate - sellBuyLossAmt})
                    </span>
                  ) : (
                    <span>({interestAmtAfterTerm * sellRate})</span>
                  )}
                </div>
              );
            })}
            <input
              id={`label-${r.period}`}
              type="text"
              placeholder="label"
              style={{ width: '10rem', padding: '.3rem', margin: '6px 3px' }}
            />
            <input
              id={`rate-${r.period}`}
              type="number"
              placeholder="Add new rate"
              style={{ width: '10rem', padding: '.3rem', margin: '6px 3px' }}
            />
            <button
              style={{ width: '3rem', padding: '.3rem', margin: '6px 3px' }}
              onClick={() => {
                const labelEl = document.getElementById(`label-${r.period}`) as HTMLInputElement;
                const rateEl = document.getElementById(`rate-${r.period}`) as HTMLInputElement;

                if (labelEl.value && rateEl.value) {
                  handleAddRate(i, labelEl.value, Number.parseFloat(rateEl.value));
                  // Clear inputs after adding
                  labelEl.value = '';
                  rateEl.value = '';
                }
              }}
            >
              +
            </button>
          </div>
        ))}
        <input
          id={`new-period`}
          type="number"
          placeholder="new period. e.g. '12'"
          style={{ width: '15rem', padding: '.3rem', margin: '6px 3px' }}
        />
        <button
          style={{ width: '100%', padding: '.3rem', margin: '6px 3px' }}
          onClick={() => {
            const newPeriodEl = document.getElementById(`new-period`) as HTMLInputElement;

            handleAddPeriod(Number.parseInt(newPeriodEl.value));
            newPeriodEl.value = '';
          }}
        >
          +
        </button>
      </article>
    </>
  );
}
