import { alphabet } from "./utilities";

function createSheet(state) {
  const sheetName = "sheet" + (state ? Object.keys(state).length + 1 : 1);
  const sheet = {};
  sheet[sheetName] = {
    numRows: 50,
  };

  for (let i = 1; i <= 50; i++) {
    for (let j = 0; j < 26; j++) {
      sheet[sheetName][alphabet[j] + i] = {
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
      const x = {
        ...state[action.currentSheet][action.payload.name],
        ...action.payload.cellData,
      };

      const newState = { ...state };

      newState[action.currentSheet][action.payload.name] = {
        ...state[action.currentSheet][action.payload.name],
        ...x,
      };

      return newState;
    default:
      return state;
  }
}

export const CreateSheetAction = () => {
  return { type: "CREATE_SHEET" };
};

export const UpdateCellAction = (name, cellData, currentSheet) => {
  return { type: "UPDATE_CELL", payload: { cellData, name }, currentSheet };
};
