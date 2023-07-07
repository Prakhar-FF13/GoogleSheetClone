import { PostAdd } from "@mui/icons-material";
import "./SheetBar.css";
import { CreateSheetAction } from "../reducer";
import React from "react";

function Sheetbar({ switchSheet, sheets, dispatch, currentSheet }) {
  return (
    <div className="sheetbar-container">
      <PostAdd
        className="sheetbar-items"
        onClick={() => {
          dispatch(CreateSheetAction());
        }}
      />
      {sheets.length > 0 &&
        sheets.map((s) => {
          return (
            <span
              key={s}
              onClick={() => {
                switchSheet(s);
              }}
              className={`sheetbar-items sheet-switch-button ${
                currentSheet === s ? "current-sheet" : ""
              }`}
            >
              {s}
            </span>
          );
        })}
    </div>
  );
}

export default React.memo(Sheetbar);
