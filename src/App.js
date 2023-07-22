import { useReducer, useState } from "react";
import CellActions from "./CellActions";
import FormulaActions from "./FormulaActions";
import Grid from "./Grid";
import PageActions from "./PageActions";
import "./App.css";
import Sheetbar from "./SheetBar";
import reducer from "./reducer";
import { produce, enableMapSet } from "immer";

enableMapSet();

/**
 * App component holds the main state as well as genrates the UI.
 * It displays the main bars (main menu, cell action menu),
 * footer component to create sheets and a Grid component to display cells.
 *
 */

function App() {
  // main state is help by this component as it is needed by more than 1 components.
  const [state, dispatch] = useReducer(produce(reducer), {});

  // this state var is used to switch btw multiple sheets
  const [currentSheet, switchSheet] = useState(null);

  // clicking makes a cell active, below 2 variables get the row and col of active cell.
  const activeCellId =
    state && state[currentSheet] && state[currentSheet]["activeCell"];
  const activeCellRow =
    activeCellId && state[currentSheet]["activeCell"].slice(1);
  const activeCellCol = activeCellId && state[currentSheet]["activeCell"][0];

  return (
    <div className="main-container">
      <PageActions />
      <CellActions
        activeCell={
          activeCellId && state[currentSheet][activeCellRow][activeCellCol]
        }
        dispatch={dispatch}
        currentSheet={currentSheet}
        clipBoardCell={
          currentSheet &&
          state[currentSheet] &&
          state[currentSheet]["clipboardCell"]
        }
      />
      <FormulaActions
        activeCellId={
          state && state[currentSheet] && state[currentSheet]["activeCell"]
        }
        currentSheet={currentSheet}
        sheet={state && state[currentSheet]}
        dispatch={dispatch}
      />
      <Grid
        state={currentSheet && state[currentSheet]}
        dispatch={dispatch}
        currentSheet={currentSheet}
      />
      <Sheetbar
        switchSheet={switchSheet}
        sheets={state && Object.keys(state) && Object.keys(state)}
        dispatch={dispatch}
        currentSheet={currentSheet}
      />
    </div>
  );
}

export default App;
