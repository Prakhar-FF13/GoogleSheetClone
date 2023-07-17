import "./GridCell.css";
import React from "react";
import {
  ChangeActiveCell,
  ChangeActiveCellProperties,
  ReevaluateFormula,
  RemoveDependentCell,
} from "../reducer";

/**
 * This component is used to an individual cell.
 * It setups the handles to handle updating Cell information.
 * It also changes the activeCell when clicked on it.
 * disptach function is used to update the state with new information.
 *
 */
function GridCell({ cellState, dispatch, currentSheet }) {
  // cell content change, update main app state.
  const updateCell = (content) => {
    dispatch(
      ChangeActiveCellProperties(cellState.id, currentSheet, "content", content)
    );

    dispatch(RemoveDependentCell(cellState.id, currentSheet));

    dispatch(
      ChangeActiveCellProperties(cellState.id, currentSheet, "formula", "")
    );

    cellState.dependentCells.forEach((id) => {
      dispatch(ReevaluateFormula(id, currentSheet));
    });
  };

  // on clicking makes this cell active, notify with update state.
  const changeActiveCell = () => {
    dispatch(ChangeActiveCell(cellState.id, currentSheet));
  };

  // styles to be applied, stored in state.
  // these stles can be changed via cell actions component.
  const extraStyle = {
    textAlign: cellState.alignment,
    fontFamily: cellState.fontFamily,
    fontSize: cellState.fontSize + "px",
    fontWeight: cellState.bold === false ? "normal" : "bold",
    fontStyle: cellState.italic === false ? "normal" : "italic",
    textDecoration: cellState.underline === false ? "none" : "underline",
    color: cellState.color || "black",
    backgroundColor: cellState.backgroundColor || "white",
  };

  return (
    <input
      id={currentSheet + "-" + cellState.id}
      className="grid-cell"
      name={cellState.id}
      value={cellState && cellState["content"]}
      onChange={(e) => {
        updateCell(e.target.value);
      }}
      onFocus={() => changeActiveCell()}
      style={extraStyle}
    />
  );
}

export default React.memo(GridCell);
