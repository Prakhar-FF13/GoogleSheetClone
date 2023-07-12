import "./Grid.css";
import GridRow from "./GridRow";

const GenerateRows = (numRows, rowsState, dispatch, currentSheet) => {
  const r = [];
  for (let i = 0; i <= numRows; i++)
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

export default function Grid({ state, dispatch, currentSheet }) {
  const numRows = state ? state.numRows : -1;

  return (
    <div className="grid-container">
      {GenerateRows(
        numRows,
        state !== null ? state : {},
        dispatch,
        currentSheet
      )}
    </div>
  );
}
