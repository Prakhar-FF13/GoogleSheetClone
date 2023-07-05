import "./GridCell.css";

export default function GridCell({ name, value = null }) {
  return (
    <span
      className="grid-cell"
      contentEditable
      name={name}
      value={value}
    ></span>
  );
}
