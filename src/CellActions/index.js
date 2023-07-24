import {
  AddDependentCell,
  ChangeActiveCellProperties,
  CopyCell,
  CutCell,
  DownloadAction,
  PasteCell,
  ReevaluateFormula,
  UploadAction,
} from "../reducer";
import "./CellActions.css";
import {
  CloudDownload,
  CloudUpload,
  ContentCopy,
  ContentCut,
  ContentPaste,
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
export default function CellActions({
  activeCell,
  dispatch,
  currentSheet,
  clipBoardCell,
}) {
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

  const handlePaste = () => {
    if (!activeCell && !activeCell.id) return;
    dispatch(PasteCell(activeCell.id, currentSheet));
    if (clipBoardCell) {
      dispatch(
        AddDependentCell(activeCell.id, clipBoardCell.formula, currentSheet)
      );
      dispatch(ReevaluateFormula(activeCell.id, currentSheet));
    }
  };

  const handleDownload = () => {
    dispatch(DownloadAction(currentSheet));
  };

  const handleUpload = (e) => {
    const fr = new FileReader();
    const f = e.target.files && e.target.files[0];
    if (!f || f.type !== "text/plain") return;
    fr.readAsText(f);
    fr.onload = () => {
      try {
        const sheetJson = JSON.parse(fr.result);
        dispatch(UploadAction(f.name, sheetJson));
      } catch (e) {
        alert(
          "Error loading sheet, make sure json file in correct format is being uploaded"
        );
      }
    };
  };

  return (
    <div className="cell-actions-container">
      <ContentCopy
        className="cell-actions"
        onClick={() =>
          activeCell &&
          activeCell.id &&
          dispatch(CopyCell(activeCell, currentSheet))
        }
      />
      <ContentCut
        className="cell-actions"
        onClick={() =>
          activeCell &&
          activeCell.id &&
          dispatch(CutCell(activeCell, currentSheet))
        }
      />
      <ContentPaste className="cell-actions" onClick={() => handlePaste()} />
      <select
        className="cell-actions font-dropdown"
        value={activeCell && activeCell.fontFamily}
        onClick={(e) => activeCell && activeCell.id && changeFontFamily(e)}
        disabled={activeCell && activeCell.id ? false : true}
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
        onClick={(e) => activeCell && activeCell.id && changeFontSize(e)}
        disabled={activeCell && activeCell.id ? false : true}
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
        onClick={() => activeCell && activeCell.id && changeBoldProp()}
      />
      <FormatItalic
        className={`cell-actions ${
          activeCell.italic ? "cell-action-selected" : ""
        }`}
        onClick={() => activeCell && activeCell.id && changeItalicProp()}
      />
      <FormatUnderlined
        className={`cell-actions ${
          activeCell.underline ? "cell-action-selected" : ""
        }`}
        name="underline"
        onClick={() => activeCell && activeCell.id && changeUnderlineProp()}
      />
      <FormatAlignLeft
        className={`cell-actions ${
          activeCell.alignment === "left" ? "cell-action-selected" : ""
        }`}
        onClick={() => activeCell && activeCell.id && changeAlignment("left")}
      />
      <FormatAlignCenter
        className={`cell-actions ${
          activeCell.alignment === "center" ? "cell-action-selected" : ""
        }`}
        onClick={() => activeCell && activeCell.id && changeAlignment("center")}
      />
      <FormatAlignRight
        className={`cell-actions ${
          activeCell.alignment === "right" ? "cell-action-selected" : ""
        }`}
        onClick={() => activeCell && activeCell.id && changeAlignment("right")}
      />
      <div className="cell-actions cell-action-choose">
        <FormatColorText />
        <input
          type="color"
          className="hidden-input"
          onChange={(e) => changeTextColor(e.target.value)}
          value={activeCell.color || "black"}
          disabled={activeCell && activeCell.id ? false : true}
        />
      </div>
      <div className="cell-actions cell-action-choose">
        <FormatColorFill />
        <input
          type="color"
          className="hidden-input"
          onChange={(e) => changeBackgroundColor(e.target.value)}
          value={activeCell.backgroundColor || "white"}
          disabled={activeCell && activeCell.id ? false : true}
        />
      </div>
      <div className="cell-actions cell-action-choose">
        <CloudUpload />
        <input
          type="file"
          name="sheet-upload"
          id="sheet-upload"
          className="hidden-input"
          onChange={(e) => handleUpload(e)}
        />
      </div>
      <div className="cell-actions">
        <CloudDownload onClick={() => handleDownload()} />
      </div>
    </div>
  );
}
