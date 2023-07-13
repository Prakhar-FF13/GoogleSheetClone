import { useReducer, useState } from "react";
import CellActions from "./CellActions";
import FormulaActions from "./FormulaActions";
import Grid from "./Grid";
import PageActions from "./PageActions";
import "./App.css";
import Sheetbar from "./SheetBar";
import reducer from "./reducer";
import { produce } from "immer";

function App() {
  const [state, dispatch] = useReducer(produce(reducer), {});
  const [currentSheet, switchSheet] = useState(null);

  // const activeCellId =
  //   state && state[currentSheet] && state[currentSheet]["activeCell"];

  const activeCellRow =
    state &&
    state[currentSheet] &&
    state[currentSheet]["activeCell"] &&
    state[currentSheet]["activeCell"][1];
  const activeCellCol =
    state &&
    state[currentSheet] &&
    state[currentSheet]["activeCell"] &&
    state[currentSheet]["activeCell"][0];

  return (
    <div className="main-container">
      <PageActions />
      <CellActions
        activeCell={
          state &&
          state[currentSheet] &&
          state[currentSheet]["activeCell"] &&
          state[currentSheet][activeCellRow][activeCellCol]
        }
        dispatch={dispatch}
        currentSheet={currentSheet}
      />
      <FormulaActions
        activeCellId={
          state && state[currentSheet] && state[currentSheet]["activeCell"]
        }
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
