import { alphabet } from "./utilities";
import {
  infixToPostfix,
  evaluatePostFix,
  getCellValuesInPostfix,
} from "./FormulaActions/infixToPostfix";

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
        fontSize: 14,
        color: "black",
        backgroundColor: "white",
        dependentCells: new Set(),
        formula: "",
      };
    }
  }

  return sheet;
}

function ReevaluateFormulaRecursive(cellId, currentSheet, draft) {
  const cellRow = cellId.slice(1),
    cellCol = cellId[0],
    formula = draft[currentSheet][cellRow][cellCol].formula;

  const [formulaArrayPostfix, err] = infixToPostfix(formula);

  if (err) {
    console.log(err);
    return;
  }

  const [postfixArray] = getCellValuesInPostfix(
    formulaArrayPostfix,
    cellId,
    draft[currentSheet]
  );

  const [val, err2] = evaluatePostFix(postfixArray);

  if (err2) {
    console.log(err2);
    return;
  }

  draft[currentSheet][cellRow][cellCol]["content"] = val;

  draft[currentSheet][cellRow][cellCol].dependentCells.forEach((cid) => {
    ReevaluateFormulaRecursive(cid, currentSheet, draft);
  });
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
      action.dependentOn.forEach((id) => {
        draft[action.currentSheet][id.slice(1)][id[0]].dependentCells.add(
          action.activeCellId
        );
      });
      break;
    case "REMOVE_DEPENDENT_CELLS":
      action.dependentOn.forEach((id) => {
        draft[action.currentSheet][id.slice(1)][id[0]].dependentCells.delete(
          action.activeCellId
        );
      });
      break;
    case "REEVALUATE_FORMULA":
      ReevaluateFormulaRecursive(action.cellId, action.currentSheet, draft);
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

export const AddDependentCell = (activeCellId, dependentOn, currentSheet) => {
  return {
    type: "ADD_DEPENDENT_CELLS",
    activeCellId,
    dependentOn,
    currentSheet,
  };
};

export const RemoveDependentCell = (
  activeCellId,
  dependentOn,
  currentSheet
) => {
  return {
    type: "REMOVE_DEPENDENT_CELLS",
    activeCellId,
    dependentOn,
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
