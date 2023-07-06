import { useReducer, useState } from "react";
import CellActions from "./CellActions";
import FormulaActions from "./FormulaActions";
import Grid from "./Grid";
import PageActions from "./PageActions";
import "./App.css";
import Sheetbar from "./SheetBar";
import reducer from "./reducer";
import { SheetContext } from "./context";

function App() {
  const [state, dispatch] = useReducer(reducer, {});
  const [activeCell, setActiveCell] = useState(null);
  const [currentSheet, switchSheet] = useState(null);

  return (
    <SheetContext.Provider value={{ state, dispatch, currentSheet }}>
      <div className="main-container">
        <PageActions />
        <CellActions />
        <FormulaActions />
        <Grid activeCell={activeCell} setActiveCell={setActiveCell} />
        <Sheetbar switchSheet={switchSheet} />
      </div>
    </SheetContext.Provider>
  );
}

export default App;
