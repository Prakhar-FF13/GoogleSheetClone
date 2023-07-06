import "./GridRow.css";
import GridCell from "./GridCell";
import { alphabet } from "../utilities";

function generateRow(rowNum) {
  const row = [];
  alphabet.forEach((r) => {
    row.push(<GridCell name={`${r}${rowNum}`} key={`${r}${rowNum}`} />);
  });
  return row;
}

export default function GridRow({ rowNum }) {
  return <div className="grid-row">{generateRow(rowNum)}</div>;
}
