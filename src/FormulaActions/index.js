import { useEffect } from "react";
import "./FormulaActions.css";

/**
 * This component is used to display current active cell and allows formula evaulation
 *
 */
export default function FormulaActions({ activeCellId, currentSheet }) {
  // using the active cell and current sheet prop
  // give a border arounc the active cell.
  useEffect(() => {
    // select active cell through id.
    const active = document.querySelector(`#${currentSheet}-${activeCellId}`);

    // add the border class.
    active && active.classList.add("grid-cell-active");

    return () => {
      active && active.classList.remove("grid-cell-active");
    };
  }, [activeCellId, currentSheet]);

  return (
    <div className="formula-container">
      <div className="formula-items formula-active-cell">{activeCellId}</div>
      <div className="formula-items formula-group">
        <span className="fx">fx</span>
        <input
          className="formula-input"
          placeholder="Enter a valid mathematical expression"
        />
      </div>
    </div>
  );
}
