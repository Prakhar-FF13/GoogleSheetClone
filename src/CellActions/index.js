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

export default function CellActions() {
  return (
    <div className="cell-actions-container">
      <ContentCopy className="cell-actions" />
      <ContentCut className="cell-actions" />
      <select className="cell-actions font-dropdown">
        <option value="Montserrat">Montserrat</option>
        <option value="Raleway">Raleway</option>
        <option value="Roboto">Roboto</option>
        <option value="san-serif">San Serif</option>
        <option value="arial">Arial</option>
      </select>
      <select className="cell-actions font-dropdown">
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
      </select>
      <FormatBold className="cell-actions" />
      <FormatItalic className="cell-actions" />
      <FormatUnderlined className="cell-actions" />
      <FormatAlignLeft className="cell-actions" />
      <FormatAlignCenter className="cell-actions" />
      <FormatAlignRight className="cell-actions" />
    </div>
  );
}
