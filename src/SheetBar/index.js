import { PostAdd } from "@mui/icons-material";
import "./SheetBar.css";
import { CreateSheetAction } from "../reducer";
import React from "react";

export default function Sheetbar({
  switchSheet,
  state,
  dispatch,
  currentSheet,
}) {
  return (
    <div className="sheetbar-container">
      <PostAdd
        className="sheetbar-items"
        onClick={() => {
          dispatch(CreateSheetAction());
        }}
      />
      {state &&
        Object.keys(state) &&
        Object.keys(state).length > 0 &&
        Object.keys(state).map((s) => {
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
