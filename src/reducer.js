import { alphabet } from "./utilities";

function createSheet(state) {
  const sheetName = "sheet" + (state ? Object.keys(state).length + 1 : 1);
  const sheet = {};
  sheet[sheetName] = {
    numRows: 50,
  };

  for (let i = 1; i <= 50; i++) {
    sheet[sheetName][i] = {};
    for (let j = 0; j < 26; j++) {
      sheet[sheetName][i][alphabet[j]] = {
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

export default function reducer(state, action) {
  switch (action.type) {
    case "CREATE_SHEET":
      return Object.assign({ ...state }, createSheet(state));
    case "UPDATE_CELL":
      const newState = { ...state };
      newState[action.currentSheet] = { ...state[action.currentSheet] };
      newState[action.currentSheet][action.currentRow] = {
        ...state[action.currentSheet][action.currentRow],
      };
      newState[action.currentSheet][action.currentRow][action.cellState.id[0]] =
        { ...action.cellState };
      return newState;
    default:
      return state;
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
