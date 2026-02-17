import { useState, useEffect, ChangeEvent } from 'react';

interface KeyValues {
  selected: number;
  waterml: number[];
}

export default function CoffeeRatio() {
  const brewTypes = [
    { id: 'filter', label: 'pour over / drip coffee', ratio: 0.06, default: 1000 },
    { id: 'espresso', label: 'espresso', ratio: 0.5, default: 36 },
  ];

  const storedResults = window.localStorage.getItem('coffeeratiodata');
  const kv: KeyValues = storedResults
    ? JSON.parse(storedResults)
    : { selected: 0, waterml: brewTypes.map((a) => a.default) };

  const [selectedBrewType, setBrewType] = useState<number>(kv?.selected ?? 0);
  const [ratio, setRatio] = useState<number>(brewTypes[selectedBrewType].ratio);

  const [waterml, setWaterml] = useState<number | null>(kv.waterml[selectedBrewType]);
  const [coffeeg, setCoffeeg] = useState<number | null>(kv.waterml[selectedBrewType] * ratio);

  useEffect(() => {
    setRatio(brewTypes[selectedBrewType].ratio);
  }, [selectedBrewType]);

  useEffect(() => {
    setCoffeeg(waterml == null ? null : parseFloat((waterml * ratio).toFixed(2)));
  }, [ratio]);

  const handleWaterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const waterValue = parseFloat(e.target.value);
    if (isNaN(waterValue)) {
      setWaterml(null);
      setCoffeeg(null);
    } else {
      setWaterml(waterValue);
      setCoffeeg(parseFloat((waterValue * ratio).toFixed(2)));
    }
  };

  const handleCoffeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const coffeeValue = parseFloat(e.target.value);
    if (isNaN(coffeeValue)) {
      setCoffeeg(null);
      setWaterml(null);
    } else {
      setCoffeeg(coffeeValue);
      setWaterml(parseFloat((coffeeValue / ratio).toFixed(2)));
    }
  };

  useEffect(() => {
    window.localStorage.setItem(
      'calc2data',
      JSON.stringify({
        selectedBrewType: selectedBrewType,
        waterml: [],
      })
    );
  }, [selectedBrewType, waterml]);

  return (
    <>
      {brewTypes.map(({ id, label }, i) => (
        <div key={id}>
          <input
            id={'brewtype-radio-' + id}
            name="brewtype-radio"
            type="radio"
            value={i}
            onChange={(e) => setBrewType(Number(e.target.value))}
            defaultChecked={i == 0}
          />
          <label htmlFor={'brewtype-radio-' + id}>
            <div>{label}</div>
          </label>
        </div>
      ))}
      <div>
        <label>water ml</label>
        <input value={waterml ?? ''} onChange={handleWaterChange} type="number" />
      </div>
      <div>
        <label>coffee g</label>
        <input value={coffeeg ?? ''} onChange={handleCoffeeChange} type="number" />
      </div>
    </>
  );
}
