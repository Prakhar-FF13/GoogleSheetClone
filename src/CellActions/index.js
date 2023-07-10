import "./CellActions.css";
import {
  ContentCopy,
  ContentCut,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";

export default function CellActions({ activeCell }) {
  if (!activeCell) activeCell = {};

  return (
    <div className="cell-actions-container">
      <ContentCopy className="cell-actions" />
      <ContentCut className="cell-actions" />
      <select
        className="cell-actions font-dropdown"
        value={activeCell && activeCell.fontFamily}
      >
        <option value="Montserrat">Montserrat</option>
        <option value="Raleway">Raleway</option>
        <option value="Roboto">Roboto</option>
        <option value="san-serif">San Serif</option>
        <option value="arial">Arial</option>
      </select>
      <select
        className="cell-actions font-dropdown"
        value={activeCell.fontSize}
      >
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
      </select>
      <FormatBold
        className={`cell-actions ${
          activeCell.bold ? "cell-action-selected" : ""
        }`}
      />
      <FormatItalic
        className={`cell-actions ${
          activeCell.italic ? "cell-action-selected" : ""
        }`}
      />
      <FormatUnderlined
        className={`cell-actions ${
          activeCell.underline ? "cell-action-selected" : ""
        }`}
      />
      <FormatAlignLeft
        className={`cell-actions ${
          activeCell.alignment === "left" ? "cell-action-selected" : ""
        }`}
      />
      <FormatAlignCenter
        className={`cell-actions ${
          activeCell.alignment === "center" ? "cell-action-selected" : ""
        }`}
      />
      <FormatAlignRight
        className={`cell-actions ${
          activeCell.alignment === "right" ? "cell-action-selected" : ""
        }`}
      />
    </div>
  );
}
