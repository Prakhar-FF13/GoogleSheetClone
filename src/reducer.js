import { alphabet } from "./utilities";
import {
  infixToPostfix,
  evaluatePostFix,
  getCellValuesInPostfix,
} from "./FormulaActions/infixToPostfix";

function solveFormula(cellId, draft, currentSheet) {
  const cellRow = cellId.slice(1),
    cellCol = cellId[0],
    formula = draft[currentSheet][cellRow][cellCol].formula;

  const [formulaArrayPostfix, err] = infixToPostfix(formula);

  if (err) {
    console.log(err);
    alert(err);
    return [null, null, null, null, err];
  }

  const [postfixArray, dependentOn, err2] = getCellValuesInPostfix(
    formulaArrayPostfix,
    cellId,
    draft[currentSheet]
  );

  if (err2) {
    console.log(err2);
    alert(err2);
    return [formulaArrayPostfix, null, null, null, err2];
  }

  const [val, err3] = evaluatePostFix(postfixArray);

  if (err3) {
    console.log(err3);
    alert(err3);
    return [formulaArrayPostfix, postfixArray, null, null, err];
  }

  return [formulaArrayPostfix, postfixArray, dependentOn, val, null];
}

function createCellState(col, row) {
  return {
    id: col + row,
    content: "",
    bold: false,
    italic: false,
    underline: false,
    alignment: "left",
    fontFamily: "arial",
    fontSize: 14,
    color: "black",
    backgroundColor: "white",
    dependentCells: new Set(),
    formula: "",
  };
}

function createSheet() {
  const sheet = {
    numRows: 50,
    activeCell: null,
    clipboardCell: null,
  };

  for (let i = 1; i <= 50; i++) {
    sheet[i] = {};
    for (let j = 0; j < 26; j++) {
      sheet[i][alphabet[j]] = createCellState(alphabet[j], i);
    }
  }

  return sheet;
}

function ReevaluateFormulaRecursive(cellId, currentSheet, draft, visited) {
  if (visited[cellId] === 1) {
    return [false, "Cyclic Dependency Detected, Please change formula"];
  }

  visited[cellId] = 1;

  const cellRow = cellId.slice(1),
    cellCol = cellId[0];

  const [, , , val, err] = solveFormula(cellId, draft, currentSheet);

  if (err) {
    console.log(err);
    return [false, err];
  }

  const prevVal = draft[currentSheet][cellRow][cellCol]["content"];
  draft[currentSheet][cellRow][cellCol]["content"] = val;

  for (const cid of draft[currentSheet][cellRow][cellCol].dependentCells) {
    const [ok, err4] = ReevaluateFormulaRecursive(
      cid,
      currentSheet,
      draft,
      visited
    );

    if (!ok) {
      draft[currentSheet][cellRow][cellCol]["content"] = prevVal;
      return [false, err4];
    }
  }

  visited[cellId] = 2;

  return [true, null];
}

export default function reducer(draft, action) {
  switch (action.type) {
    case "CREATE_SHEET":
      const sheetName = "sheet" + (draft ? Object.keys(draft).length + 1 : 1);
      draft[sheetName] = createSheet();
      break;
    case "CHANGE_ACTIVE_CELL":
      draft[action.currentSheet]["activeCell"] = action.cellId;
      break;
    case "CHANGE_ACTIVE_CELL_PROPERTIES":
      draft[action.currentSheet][action.cellId.slice(1)][action.cellId[0]][
        action.property
      ] = action.value;
      break;
    case "ADD_DEPENDENT_CELLS":
      draft[action.currentSheet][action.activeCellId.slice(1)][
        action.activeCellId[0]
      ]["formula"] = action.fx;

      const [, , addDepCells, , errAddDepCells] = solveFormula(
        action.activeCellId,
        draft,
        action.currentSheet
      );

      if (errAddDepCells) {
        draft[action.currentSheet][action.activeCellId.slice(1)][
          action.activeCellId[0]
        ]["formula"] = "";
        draft[action.currentSheet][action.activeCellId.slice(1)][
          action.activeCellId[0]
        ].dependentCells.clear();
        return;
      }

      addDepCells.forEach((id) => {
        draft[action.currentSheet][id.slice(1)][id[0]].dependentCells.add(
          action.activeCellId
        );
      });
      break;
    case "REMOVE_DEPENDENT_CELLS":
      const [, , removeDepCells, , errRemDep] = solveFormula(
        action.activeCellId,
        draft,
        action.currentSheet
      );

      if (errRemDep) {
        console.log(errRemDep);
        return;
      }

      removeDepCells.forEach((id) => {
        draft[action.currentSheet][id.slice(1)][id[0]].dependentCells.delete(
          action.activeCellId
        );
      });

      break;
    case "REEVALUATE_FORMULA":
      const visited = {};
      const [ok, errReEval] = ReevaluateFormulaRecursive(
        action.cellId,
        action.currentSheet,
        draft,
        visited
      );
      if (!ok) alert(errReEval);
      break;
    case "COPY_CELL":
      draft[action.currentSheet]["clipboardCell"] = action.cellState;
      break;
    case "CUT_CELL":
      draft[action.currentSheet]["clipboardCell"] = action.cellState;
      draft[action.currentSheet][action.cellState.id.slice(1)][
        action.cellState.id[0]
      ] = createCellState(action.cellState.id[0], action.cellState.id.slice(1));
      break;
    case "PASTE_CELL":
      draft[action.currentSheet][action.activeCellId.slice(1)][
        action.activeCellId[0]
      ] = draft[action.currentSheet]["clipboardCell"];
      draft[action.currentSheet][action.activeCellId.slice(1)][
        action.activeCellId[0]
      ].id = action.activeCellId;
      break;
    case "DOWNLOAD_SHEET":
      if (!action.currentSheet || action.currentSheet.length === 0) return;
      const file = new Blob([JSON.stringify(draft[action.currentSheet])], {
        type: "text/plain",
      });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = action.currentSheet + ".txt";
      a.click();

      break;
    case "UPLOAD_SHEET":
      const cS = action.name.split(".")[0];

      draft[cS] = action.newSheet;

      for (let i = 1; i <= action.newSheet.numRows; i++) {
        for (let j = 0; j < 26; j++) {
          draft[cS][i][alphabet[j]].dependentCells = new Set();
        }
      }

      for (let i = 1; i <= action.newSheet.numRows; i++) {
        for (let j = 0; j < 26; j++) {
          const cId = alphabet[j] + i;

          const [, , addDepCells, , errAddDepCells] = solveFormula(
            cId,
            draft,
            cS
          );

          if (errAddDepCells) {
            draft[cS][cId.slice(1)][cId[0]]["formula"] = "";

            draft[cS][cId.slice(1)][cId[0]].dependentCells.clear();
            return;
          }

          addDepCells.forEach((id) => {
            draft[cS][id.slice(1)][id[0]].dependentCells.add(cId);
          });
        }
      }
      break;
    default:
      break;
  }
}

export const CreateSheetAction = () => {
  return { type: "CREATE_SHEET" };
};

export const ChangeActiveCell = (cellId, currentSheet) => {
  return { type: "CHANGE_ACTIVE_CELL", cellId, currentSheet };
};

export const ChangeActiveCellProperties = (
  cellId,
  currentSheet,
  property,
  value
) => {
  return {
    type: "CHANGE_ACTIVE_CELL_PROPERTIES",
    cellId,
    currentSheet,
    property,
    value,
  };
};

export const AddDependentCell = (activeCellId, fx, currentSheet) => {
  return {
    type: "ADD_DEPENDENT_CELLS",
    activeCellId,
    fx,
    currentSheet,
  };
};

export const RemoveDependentCell = (activeCellId, currentSheet) => {
  return {
    type: "REMOVE_DEPENDENT_CELLS",
    activeCellId,
    currentSheet,
  };
};

export const ReevaluateFormula = (cellId, currentSheet) => {
  return {
    type: "REEVALUATE_FORMULA",
    cellId,
    currentSheet,
  };
};

export const CopyCell = (cellState, currentSheet) => {
  return {
    type: "COPY_CELL",
    cellState,
    currentSheet,
  };
};

export const CutCell = (cellState, currentSheet) => {
  return {
    type: "CUT_CELL",
    cellState,
    currentSheet,
  };
};

export const PasteCell = (activeCellId, currentSheet) => {
  return {
    type: "PASTE_CELL",
    activeCellId,
    currentSheet,
  };
};

export const DownloadAction = (currentSheet) => {
  return {
    type: "DOWNLOAD_SHEET",
    currentSheet,
  };
};

export const UploadAction = (name, newSheet) => {
  return {
    type: "UPLOAD_SHEET",
    name,
    newSheet,
  };
};
