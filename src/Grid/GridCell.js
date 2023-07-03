import "./GridCell.css";

export default function GridCell({ contentEditable }) {
  return <span className="grid-cell" contentEditable={contentEditable}></span>;
}
