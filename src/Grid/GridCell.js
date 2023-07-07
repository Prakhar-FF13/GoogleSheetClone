import "./GridCell.css";
import { SheetContext } from "../context";
import React from "react";
import { UpdateCellAction } from "../reducer";

export default function GridCell({ name }) {
  const { state, dispatch, currentSheet } = React.useContext(SheetContext);

  const updateCell = (content) => {
    dispatch(UpdateCellAction(name, { content: content }, currentSheet));
  };

  return (
    <input
      className="grid-cell"
      name={name}
      value={
        state && state[currentSheet] && state[currentSheet][name]["content"]
      }
      onChange={(e) => {
        updateCell(e.target.value);
      }}
    ></input>
  );
}
