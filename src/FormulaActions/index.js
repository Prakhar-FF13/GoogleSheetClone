import "./FormulaActions.css";

/**
 * This component is used to display current active cell and allows formula evaulation
 *
 */
export default function FormulaActions({ activeCellId }) {
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
