import { useState, useEffect, ChangeEvent } from 'react';

type PriceUnitTuple = [price: number | null, unit: number | null];

export default function PriceCompare() {
  const [list, setList] = useState<number[]>([0, 0]);

  // const [history, setHistory] = useState<PriceUnitTuple[][]>([[...list]]);
  // const [historyIndex, setHistoryIndex] = useState<number>(0);

  const handValChange = (i: number, val: any) => {
    let newList = [...list];
    newList[i] = Number(val);
    setList(newList);
  };

  const handleAddRemoveListItem = (newList: number[]) => {
    setList(newList);

    // const nextIndex = historyIndex + 1;
    // history[nextIndex] = [...newList];
    // setHistory(history.filter((_, i) => i <= nextIndex));
    // setHistoryIndex(nextIndex);
  };

  const sum = (numbers: number[]): number => {
    return numbers.reduce((acc, val) => acc + (val ?? 0), 0);
  };

  return (
    <>
      {/* <button
        onClick={() => {
          setList([...history[historyIndex - 1]]);
          setHistoryIndex(historyIndex - 1);
        }}
        disabled={historyIndex <= 0}
      >
        undo
      </button> */}
      {/* <button
        onClick={() => {
          setList([...history[historyIndex + 1]]);
          setHistoryIndex(historyIndex + 1);
        }}
        disabled={history.length == 0 || historyIndex + 1 == history.length}
      >
        redo
      </button> */}
      <table>
        <thead>
          <tr>
            <th>Val</th>
          </tr>
        </thead>
        <tbody>
          {list.map((val, i) => (
            <tr key={i}>
              <td>
                <input
                  value={val ?? ''}
                  type="number"
                  onChange={(e) => {
                    handValChange(i, e.target.value);
                  }}
                />
              </td>
              <td>
                <button
                  style={{ padding: '.5rem 1rem' }}
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
              <span>{sum(list)}</span>
            </td>
          </tr>
          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
              <button
                style={{ width: '100%', margin: '6px 0' }}
                onClick={() => {
                  handleAddRemoveListItem([...list, 0]);
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
