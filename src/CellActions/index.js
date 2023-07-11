import { ChangeActiveCellProperties } from "../reducer";
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

export default function CellActions({ activeCell, dispatch, currentSheet }) {
  if (!activeCell) activeCell = {};

  const changeFontFamily = (e) => {
    dispatch(
      ChangeActiveCellProperties(
        activeCell.id,
        currentSheet,
        "fontFamily",
        e.target.value
      )
    );
  };

  const changeFontSize = (e) => {
    dispatch(
      ChangeActiveCellProperties(
        activeCell.id,
        currentSheet,
        "fontSize",
        e.target.value
      )
    );
  };

  const changeBoldProp = () => {
    dispatch(
      ChangeActiveCellProperties(
        activeCell.id,
        currentSheet,
        "bold",
        !activeCell.bold
      )
    );
  };

  const changeItalicProp = () => {
    dispatch(
      ChangeActiveCellProperties(
        activeCell.id,
        currentSheet,
        "italic",
        !activeCell.italic
      )
    );
  };

  const changeUnderlineProp = () => {
    dispatch(
      ChangeActiveCellProperties(
        activeCell.id,
        currentSheet,
        "underline",
        !activeCell.underline
      )
    );
  };

  const changeAlignment = (value) => {
    dispatch(
      ChangeActiveCellProperties(
        activeCell.id,
        currentSheet,
        "alignment",
        value
      )
    );
  };

  return (
    <div className="cell-actions-container">
      <ContentCopy className="cell-actions" />
      <ContentCut className="cell-actions" />
      <select
        className="cell-actions font-dropdown"
        value={activeCell && activeCell.fontFamily}
        onClick={(e) => changeFontFamily(e)}
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
        onClick={(e) => changeFontSize(e)}
      >
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
        <option value="24">24</option>
        <option value="26">26</option>
        <option value="28">28</option>
      </select>
      <FormatBold
        className={`cell-actions ${
          activeCell.bold ? "cell-action-selected" : ""
        }`}
        onClick={() => changeBoldProp()}
      />
      <FormatItalic
        className={`cell-actions ${
          activeCell.italic ? "cell-action-selected" : ""
        }`}
        onClick={() => changeItalicProp()}
      />
      <FormatUnderlined
        className={`cell-actions ${
          activeCell.underline ? "cell-action-selected" : ""
        }`}
        name="underline"
        onClick={() => changeUnderlineProp()}
      />
      <FormatAlignLeft
        className={`cell-actions ${
          activeCell.alignment === "left" ? "cell-action-selected" : ""
        }`}
        onClick={() => changeAlignment("left")}
      />
      <FormatAlignCenter
        className={`cell-actions ${
          activeCell.alignment === "center" ? "cell-action-selected" : ""
        }`}
        onClick={() => changeAlignment("center")}
      />
      <FormatAlignRight
        className={`cell-actions ${
          activeCell.alignment === "right" ? "cell-action-selected" : ""
        }`}
        onClick={() => changeAlignment("right")}
      />
    </div>
  );
}
