import { useReducer, useState } from "react";
import CellActions from "./CellActions";
import FormulaActions from "./FormulaActions";
import Grid from "./Grid";
import PageActions from "./PageActions";
import "./App.css";
import Sheetbar from "./SheetBar";
import reducer from "./reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  const [activeCell, setActiveCell] = useState(null);
  const [currentSheet, switchSheet] = useState(null);

  return (
    <div className="main-container">
      <PageActions />
      <CellActions />
      <FormulaActions />
      <Grid
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        state={state}
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
