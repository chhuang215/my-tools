import { useState, useEffect, ChangeEvent } from 'react';

interface KeyValues {
  termDepositAmt: number;
  buyRate: number;
  sellRate: number;
}

export default function Calc2() {
  const RATES_ = {
    '1': [
      { label: 'regular', rate: 0.027 },
      { label: 'special', rate: 0.05 },
      // { label: 'regular', rate: 0.0305 },
      // { label: 'special', rate: 0.06 },
      // { label: 'special', rate: 0.065 },
    ],
    '3': [
      { label: 'regular', rate: 0.0275 },
      { label: 'special', rate: 0.05 },
      // { label: 'regular', rate: 0.0345 },
      // { label: 'special', rate: 0.054 },
      // { label: 'special', rate: 0.058 },
    ],
  };

  const storedResults = window.localStorage.getItem('calc2data');
  const kv: KeyValues = storedResults ? JSON.parse(storedResults) : { termDepositAmt: 0, buyRate: 0, sellRate: 0 };

  const [termDepositAmt, setTermDepositAmt] = useState<number>(kv.termDepositAmt);
  const [buyRate, setBuyRate] = useState<number>(kv.buyRate);
  const [sellRate, setSellRate] = useState<number>(kv.sellRate);

  const [buyRateAmt, setByRateAmt] = useState<number>(0);
  const [sellRateAmt, setSellRateAmt] = useState<number>(0);

  const [sellBuyLossAmt, setSellBuyLossAmt] = useState<number>(0);

  const handleChangeBuyRate = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyRate(parseFloat(e.target.value) || 0);
  };
  const handleChangeSellRate = (e: ChangeEvent<HTMLInputElement>) => {
    setSellRate(parseFloat(e.target.value) || 0);
  };

  const updateSellRateAmt = () => {
    const v = sellRate * termDepositAmt;
    setSellRateAmt(parseFloat(v.toFixed(5)));
  };

  const updateBuyRateAmt = () => {
    const v = buyRate * termDepositAmt;
    setByRateAmt(parseFloat(v.toFixed(5)));
  };

  const updateSellBuyLossAmt = () => {
    const v = (buyRate - sellRate) * termDepositAmt;
    setSellBuyLossAmt(parseFloat(v.toFixed(5)));
  };

  useEffect(updateSellRateAmt, [termDepositAmt, sellRate]);

  useEffect(updateBuyRateAmt, [termDepositAmt, buyRate]);

  useEffect(() => {
    updateSellBuyLossAmt();
    if (termDepositAmt >= 0 || buyRate >= 0 || sellRate >= 0) {
      window.localStorage.setItem(
        'calc2data',
        JSON.stringify({
          termDepositAmt: termDepositAmt ?? 0,
          buyRate: buyRate ?? 0,
          sellRate: sellRate ?? 0,
        })
      );
    }
  }, [termDepositAmt, sellRate, buyRate]);

  return (
    <>
      <article>
        <h4>Sell and Buy term deposit</h4>
        <label>Deposit amount</label>
        <input
          type="number"
          defaultValue={termDepositAmt == 0 ? '' : termDepositAmt}
          onChange={(e) => {
            setTermDepositAmt(parseFloat(e.target.value) || 0);
          }}
        />
        <label>Sell Rate </label>
        <input type="number" defaultValue={sellRate} onChange={handleChangeSellRate} /> * {termDepositAmt} ={' '}
        {sellRateAmt}
        <label>Buy Rate </label>
        <input type="number" defaultValue={buyRate} onChange={handleChangeBuyRate} /> * {termDepositAmt} = {buyRateAmt}
        <br />
        (Loss: {sellBuyLossAmt})
        <br />
        {/* <br />
        <h5>3m</h5>
        <label>Regular Interest {RATES['3'].regular * 100}%</label>
        {termDepositAmt} * ({RATES['3'].regular * 100}% / 3 months) = {regularInterestAmt3m} (
        {regularInterestAmt3m * sellRate})
        <br />
        <label>Special Interest {RATES['3'].special * 100}%</label>
        {termDepositAmt} * ({RATES['3'].special * 100}% / 3 months) = {specialInterestAmt3m} (
        {Math.round(specialInterestAmt3m * sellRate * 100000) / 100000} - {sellBuyLossAmt} ={' '}
        {specialInterestAmt3m * sellRate - sellBuyLossAmt})
        <br />
        <h5>1m</h5>
        <label>Regular Interest {RATES['1'].regular * 100}%</label>
        {termDepositAmt} * ({RATES['1'].regular * 100}% / 1 month) = {regularInterestAmt1m} (
        {regularInterestAmt1m * sellRate})
        <br />
        <label>Special Interest {RATES['1'].special * 100}%</label>
        {termDepositAmt} * ({RATES['1'].special * 100}% / 1 month) = {specialInterestAmt1m} (
        {Math.round(specialInterestAmt1m * sellRate * 100000) / 100000} - {sellBuyLossAmt} ={' '}
        {specialInterestAmt1m * sellRate - sellBuyLossAmt})
        <br />
        <br /> */}
        <br />
        {Object.entries(RATES_).map(([k, v]) => (
          <div key={k}>
            <h5>{k}m</h5>
            {v.map(({ label, rate }) => {
              const term = Number(k);
              const interestAmtPerMonth = parseFloat(((termDepositAmt * rate) / 12).toPrecision(5));
              const interestAmtAfterTerm = parseFloat((interestAmtPerMonth * term).toPrecision(5));

              // const sellAmtAfterTermDone = interestAmtAfterTerm * sellRate;

              return (
                <div key={k + rate}>
                  <label>
                    {label} interest {(rate * 100).toFixed(3)}%
                  </label>
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
          </div>
        ))}
      </article>
    </>
  );
}
