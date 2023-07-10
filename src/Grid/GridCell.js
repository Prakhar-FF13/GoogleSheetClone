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

  return (
    <input
      className="grid-cell"
      name={cellState.id}
      value={cellState && cellState["content"]}
      onChange={(e) => {
        updateCell(e.target.value);
      }}
      onClick={() => changeActiveCell()}
    ></input>
  );
}

export default React.memo(GridCell);
