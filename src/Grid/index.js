import "./Grid.css";
import GridRow from "./GridRow";

const RowNumbers = (numRows) => {
  const r = [];
  for (let i = 1; i <= numRows; i++)
    r.push(
      <span className="grid-numbers" key={i}>
        {i}
      </span>
    );

  return r;
};

export default function Grid({ numRows, dispatch, activeCell, setActiveCell }) {
  return (
    <div className="grid-container">
      <div className="grid-section-1">
        {numRows && <span className="grid-dummy" />}
        {RowNumbers(numRows)}
      </div>
      <div className="grid-section-2"></div>
    </div>
  );
}
