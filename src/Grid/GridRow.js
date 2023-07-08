import React from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { alphabet } from "../utilities";

function generateRow(rowNum, rowState, dispatch, currentSheet) {
  const row = [
    <span className={rowNum > 0 ? "grid-numbers" : "grid-dummy"} key={rowNum}>
      {rowNum > 0 ? rowNum : ""}
    </span>,
  ];
  alphabet.forEach((r) => {
    if (rowNum > 0) {
      row.push(
        <GridCell
          key={`${r}${rowNum}`}
          cellState={rowState[r]}
          dispatch={dispatch}
          currentSheet={currentSheet}
          currentRow={rowNum}
        />
      );
    } else {
      row.push(
        <span className="grid-column" key={r}>
          {r}
        </span>
      );
    }
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
