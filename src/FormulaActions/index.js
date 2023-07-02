import "./FormulaActions.css";

export default function FormulaActions() {
  return (
    <div className="formula-container">
      <div className="formula-items formula-active-cell">B6</div>
      <div className="formula-items formula-group">
        <span className="fx">fx</span>
        <input className="formula-input"></input>
      </div>
    </div>
  );
}
