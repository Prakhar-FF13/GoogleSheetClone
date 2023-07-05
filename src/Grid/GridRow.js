import "./GridRow.css";
import GridCell from "./GridCell";

function generateRow({ rowNum }) {
  const row = [];
  return row;
}

export default function GridRow({ rowNum }) {
  return <div className="grid-row">{generateRow(rowNum)}</div>;
}
