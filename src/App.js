import CellActions from "./CellActions";
import FormulaActions from "./FormulaActions";
import Grid from "./Grid";
import PageActions from "./PageActions";
import "./App.css";
import Sheetbar from "./SheetBar";

function App() {
  return (
    <div className="main-container">
      <PageActions />
      <CellActions />
      <FormulaActions />
      <Grid />
      <Sheetbar sheets={[{ id: 1, name: "Sheet 1" }]} switchSheet={() => {}} />
    </div>
  );
}

export default App;
