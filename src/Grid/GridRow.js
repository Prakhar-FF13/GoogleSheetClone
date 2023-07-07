import React from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { alphabet } from "../utilities";

function generateRow(rowNum, rowState, dispatch, currentSheet) {
  const row = [];
  alphabet.forEach((r) => {
    row.push(
      <GridCell
        key={`${r}${rowNum}`}
        cellState={rowState[r]}
        dispatch={dispatch}
        currentSheet={currentSheet}
        currentRow={rowNum}
      />
    );
  });
  return row;
}

function GridRow({ rowNum, rowState, dispatch, currentSheet }) {
  return (
    <div className="grid-row">
      {generateRow(rowNum, rowState, dispatch, currentSheet)}
    </div>
  );
}

export default React.memo(GridRow);
