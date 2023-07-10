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

  return (
    <div className="main-container">
      <PageActions />
      <CellActions />
      <FormulaActions
        activeCellId={
          state &&
          state[currentSheet] &&
          state[currentSheet]["activeCell"] &&
          state[currentSheet]["activeCell"].id
        }
      />
      <Grid state={state} dispatch={dispatch} currentSheet={currentSheet} />
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
