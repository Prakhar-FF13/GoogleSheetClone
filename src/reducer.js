const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

function createSheet(state) {
  const sheetName = "sheet" + (state ? Object.keys(state).length + 1 : 1);
  const sheet = {};
  sheet[sheetName] = {};

  for (let i = 1; i < 50; i++) {
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
    default:
      return state;
  }
}

export const CreateSheetAction = () => {
  return { type: "CREATE_SHEET" };
};
