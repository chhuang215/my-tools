import { useState, useEffect, ChangeEvent } from 'react';

type PriceUnitTuple = [price: number | null, unit: number | null];

export default function PriceCompare() {
  const [list, setList] = useState<PriceUnitTuple[]>([
    [null, null],
    [null, null],
  ]);

  const [history, setHistory] = useState<PriceUnitTuple[][]>([[...list]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const handlePriceUnitChange = (i: number, j: number, val: any) => {
    let newList = [...list];
    newList[i][j] = val ? Number(val) : null;
    setList(newList);
  };

  const handleAddRemoveListItem = (newList: PriceUnitTuple[]) => {
    setList(newList);

    const nextIndex = historyIndex + 1;
    history[nextIndex] = [...newList];
    setHistory(history.filter((_, i) => i <= nextIndex));
    setHistoryIndex(nextIndex);
  };

  return (
    <>
      <button
        onClick={() => {
          setList([...history[historyIndex - 1]]);
          setHistoryIndex(historyIndex - 1);
        }}
        disabled={historyIndex <= 0}
      >
        undo
      </button>
      <button
        onClick={() => {
          setList([...history[historyIndex + 1]]);
          setHistoryIndex(historyIndex + 1);
        }}
        disabled={history.length == 0 || historyIndex + 1 == history.length}
      >
        redo
      </button>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Unit</th>
            <th><span style={{fontSize: ".9rem"}}>Price Per Unit</span></th>
          </tr>
        </thead>
        <tbody>
          {list.map(([price, unit], i) => (
            <tr key={i}>
              <td>
                <input
                  value={price ?? ""}
                  placeholder="0"
                  type="number"
                  onChange={(e) => {
                    handlePriceUnitChange(i, 0, e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  value={unit ?? ''}
                  placeholder="1"
                  type="number"
                  onChange={(e) => {
                    handlePriceUnitChange(i, 1, e.target.value);
                  }}
                />
              </td>
              <td>
                {parseFloat(!price ? "0" : (!unit ? (price / 1).toFixed(3) : (price / unit).toFixed(3)))}
              </td>
              <td>
                <button
                  style={{ padding: '.3rem .7rem' }}
                  onClick={() => {
                    handleAddRemoveListItem(list.filter((_, index) => index !== i));
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
              <button
                style={{ width: '100%', margin: '6px 0' }}
                onClick={() => {
                  handleAddRemoveListItem([...list, [null, null]]);
                }}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
