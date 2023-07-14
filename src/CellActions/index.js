import { ChangeActiveCellProperties } from "../reducer";
import "./CellActions.css";
import {
  ContentCopy,
  ContentCut,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";

/**
 * This component is used to change cell styles like - bold, alignment, etc.
 * It used the activeCell info from main state and uses dispatch to send updates styles.
 *
 */
export default function CellActions({ activeCell, dispatch, currentSheet }) {
  if (!activeCell) activeCell = {};

  const changeFontFamily = (e) => {
    activeCell.id &&
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
    activeCell.id &&
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
    activeCell.id &&
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
    activeCell.id &&
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
    activeCell.id &&
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
    activeCell.id &&
      dispatch(
        ChangeActiveCellProperties(
          activeCell.id,
          currentSheet,
          "alignment",
          value
        )
      );
  };

  const changeTextColor = (value) => {
    activeCell.id &&
      dispatch(
        ChangeActiveCellProperties(activeCell.id, currentSheet, "color", value)
      );
  };

  const changeBackgroundColor = (value) => {
    activeCell.id &&
      dispatch(
        ChangeActiveCellProperties(
          activeCell.id,
          currentSheet,
          "backgroundColor",
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
      <div className="cell-actions cell-action-choose-color">
        <FormatColorText />
        <input
          type="color"
          className="cell-action-color-input"
          onChange={(e) => changeTextColor(e.target.value)}
          value={activeCell.color || "black"}
        />
      </div>
      <div className="cell-actions cell-action-choose-color">
        <FormatColorFill />
        <input
          type="color"
          className="cell-action-color-input"
          onChange={(e) => changeBackgroundColor(e.target.value)}
          value={activeCell.backgroundColor || "white"}
        />
      </div>
    </div>
  );
}
