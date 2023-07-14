import "./Grid.css";
import GridRow from "./GridRow";

/**
 * Generates rows - row by row.
 * Call the GridRow component by passing state for each row and dispatch function to
 * create handler to update each cell of row.
 *
 */
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

/**
 * This component is used to create the complete grid row by row.
 * It used the Generate Rows function to generate rows.
 * It passed down the necessary state parameters so that we can link each cell property.
 *
 */
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
