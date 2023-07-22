import { useEffect, useState } from "react";
import "./FormulaActions.css";
import {
  AddDependentCell,
  ReevaluateFormula,
  RemoveDependentCell,
} from "../reducer";

/**
 * This component is used to display current active cell and allows formula evaulation
 *
 */
export default function FormulaActions({
  activeCellId,
  currentSheet,
  sheet,
  dispatch,
}) {
  const [fx, setFx] = useState(
    sheet && activeCellId && activeCellId.length >= 2
      ? sheet[activeCellId.slice(1)][activeCellId[0]].formula
      : ""
  );

  // using the active cell and current sheet prop
  // give a border arounc the active cell.
  useEffect(() => {
    // select active cell through id.
    const active = document.querySelector(`#${currentSheet}-${activeCellId}`);

    // add the border class.
    active && active.classList.add("grid-cell-active");

    setFx(
      sheet && activeCellId && activeCellId.length >= 2
        ? sheet[activeCellId.slice(1)][activeCellId[0]].formula
        : ""
    );

    return () => {
      active && active.classList.remove("grid-cell-active");
    };
  }, [activeCellId, currentSheet, sheet]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && fx && fx.length) {
      dispatch(RemoveDependentCell(activeCellId, currentSheet));
      dispatch(AddDependentCell(activeCellId, fx, currentSheet));
      dispatch(ReevaluateFormula(activeCellId, currentSheet));
    }
  };

  return (
    <div className="formula-container">
      <div className="formula-items formula-active-cell">{activeCellId}</div>
      <div className="formula-items formula-group">
        <span className="fx">fx</span>
        <input
          className="formula-input"
          placeholder="Enter a valid mathematical expression"
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          value={fx}
          disabled={!activeCellId}
          onChange={(e) => setFx(e.target.value)}
        />
      </div>
    </div>
  );
}
