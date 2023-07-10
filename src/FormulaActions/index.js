import "./FormulaActions.css";

export default function FormulaActions({ activeCellId }) {
  return (
    <div className="formula-container">
      <div className="formula-items formula-active-cell">{activeCellId}</div>
      <div className="formula-items formula-group">
        <span className="fx">fx</span>
        <input className="formula-input"></input>
      </div>
    </div>
  );
}
