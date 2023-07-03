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
  const [currentSheet, switchSheet] = useState(null);

  return (
    <div className="main-container">
      <PageActions />
      <CellActions />
      <FormulaActions />
      <Grid />
      <Sheetbar
        sheets={state ? Object.keys(state) : []}
        currentSheet={currentSheet}
        switchSheet={switchSheet}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
