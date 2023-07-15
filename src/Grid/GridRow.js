import React from "react";
import "./GridRow.css";
import GridCell from "./GridCell";
import { alphabet } from "../utilities";

/**
 * This component is used to create cells in a row.
 * First rows is a column names row.
 * Other rows are editable rows.
 */
function generateRow(rowNum, rowState, dispatch, currentSheet) {
  // first cell is the dummy cell it does nothing row = 0, col = 0.
  // if row > 0 => then the cell is numbered cell.
  const row = [
    <span className={rowNum > 0 ? "grid-numbers" : "grid-dummy"} key={rowNum}>
      {rowNum > 0 ? rowNum : ""}
    </span>,
  ];

  // if row > 0 => Generate editable cell
  // if row == 0 => Generate column names - A,B,C,D
  alphabet.forEach((r) => {
    if (rowNum > 0) {
      row.push(
        <GridCell
          key={`${r}${rowNum}`}
          cellState={rowState[r]}
          dispatch={dispatch}
          currentSheet={currentSheet}
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

/**
 * This component is used to create a row of cells.
 * Calls the generateRow fn to create a row.
 *
 */

function GridRow({ rowNum, rowState, dispatch, currentSheet }) {
  return (
    <div className="grid-row">
      {generateRow(rowNum, rowState, dispatch, currentSheet)}
    </div>
  );
}

export default React.memo(GridRow);
