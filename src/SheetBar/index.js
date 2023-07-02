import { PostAdd } from "@mui/icons-material";
import "./SheetBar.css";

export default function Sheetbar({ sheets, switchSheet }) {
  return (
    <div className="sheetbar-container">
      <PostAdd className="sheetbar-items" />
      {sheets &&
        sheets.map((s) => {
          return (
            <span
              key={s.id}
              onClick={switchSheet}
              className="sheetbar-items sheet-switch-button"
            >
              {s.name}
            </span>
          );
        })}
    </div>
  );
}
