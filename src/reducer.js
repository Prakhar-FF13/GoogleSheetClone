import { alphabet } from "./utilities";

function createSheet() {
  const sheet = {
    numRows: 50,
    activeCell: null,
  };

  for (let i = 1; i <= 50; i++) {
    sheet[i] = {};
    for (let j = 0; j < 26; j++) {
      sheet[i][alphabet[j]] = {
        id: alphabet[j] + i,
        content: "",
        bold: false,
        italic: false,
        underline: false,
        alignment: "left",
        fontFamily: "arial",
        fontSize: 16,
      };
    }
  }

  return sheet;
}

export default function reducer(draft, action) {
  switch (action.type) {
    case "CREATE_SHEET":
      const sheetName = "sheet" + (draft ? Object.keys(draft).length + 1 : 1);
      draft[sheetName] = createSheet();
      break;
    case "UPDATE_CELL":
      draft[action.currentSheet][action.currentRow][action.cellState.id[0]] =
        action.cellState;
      break;
    case "CHANGE_ACTIVE_CELL":
      draft[action.currentSheet]["activeCell"] = action.cellState;
      break;
    default:
      break;
  }
}

export const CreateSheetAction = () => {
  return { type: "CREATE_SHEET" };
};

export const UpdateCellAction = (cellState, currentSheet, currentRow) => {
  return {
    type: "UPDATE_CELL",
    cellState,
    currentSheet,
    currentRow,
  };
};

export const ChangeActiveCell = (cellState, currentSheet) => {
  return { type: "CHANGE_ACTIVE_CELL", cellState, currentSheet };
};
