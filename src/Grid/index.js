import "./Grid.css";
import GridRow from "./GridRow";
import { alphabet } from "../utilities";

const RowNumbers = (numRows) => {
  const r = [];
  for (let i = 1; i <= numRows; i++)
    r.push(
      <span className="grid-numbers" key={i}>
        {i}
      </span>
    );

  return r;
};

const Columns = () => {
  const c = [];
  alphabet.forEach((r) => {
    c.push(
      <span className="grid-column" key={r}>
        {r}
      </span>
    );
  });
  return c;
};

const GenerateRows = (numRows, rowsState, dispatch, currentSheet) => {
  const r = [];
  for (let i = 1; i <= numRows; i++)
    r.push(
      <GridRow
        rowNum={i}
        key={i}
        rowState={rowsState[i]}
        dispatch={dispatch}
        currentSheet={currentSheet}
      />
    );

  return r;
};

export default function Grid({
  activeCell,
  setActiveCell,
  state,
  dispatch,
  currentSheet,
}) {
  const numRows = state && state[currentSheet] && state[currentSheet].numRows;

  return (
    <div className="grid-container">
      <div className="grid-section-1">
        {numRows && <span className="grid-dummy" />}
        {RowNumbers(numRows)}
      </div>
      <div className="grid-section-2">
        <div className="grid-columns">{numRows && Columns()}</div>
        <div>
          {GenerateRows(
            numRows,
            state !== null ? state[currentSheet] : {},
            dispatch,
            currentSheet
          )}
        </div>
      </div>
    </div>
  );
}
