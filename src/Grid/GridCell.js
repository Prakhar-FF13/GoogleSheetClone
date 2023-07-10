import "./GridCell.css";
import React from "react";
import { ChangeActiveCell, UpdateCellAction } from "../reducer";

function GridCell({ cellState, dispatch, currentSheet, currentRow }) {
  const updateCell = (content) => {
    dispatch(
      UpdateCellAction(
        { ...cellState, content: content },
        currentSheet,
        currentRow
      )
    );
  };

  const changeActiveCell = () => {
    dispatch(ChangeActiveCell(cellState, currentSheet));
  };

  const extraStyle = {
    textAlign: cellState.alignment,
    fontFamily: cellState.fontFamily,
    fontSize: cellState.fontSize,
    fontWeight: cellState.bold === false ? "normal" : "bold",
    fontStyle: cellState.italic === false ? "none" : "italic",
    textDecoration: cellState.underline === false ? "none" : "underline",
  };

  return (
    <input
      className="grid-cell"
      name={cellState.id}
      value={cellState && cellState["content"]}
      onChange={(e) => {
        updateCell(e.target.value);
      }}
      onClick={() => changeActiveCell()}
      style={extraStyle}
    ></input>
  );
}

export default React.memo(GridCell);
