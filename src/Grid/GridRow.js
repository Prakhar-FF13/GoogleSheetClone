import "./GridRow.css";
import GridCell from "./GridCell";

function generateRow({ rowNum, contentEditable }) {
  const row = [];
  return row;
}

export default function GridRow({ rowNum, contentEditable }) {
  return <div className="grid-row">{generateRow(rowNum, contentEditable)}</div>;
}
