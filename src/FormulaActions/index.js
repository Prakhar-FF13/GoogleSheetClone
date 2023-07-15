import { useEffect } from "react";
import "./FormulaActions.css";
import { infixToPostfix, evaluatePostFix } from "./infixToPostfix";
import { ChangeActiveCellProperties } from "../reducer";

/**
 * This component is used to display current active cell and allows formula evaulation
 *
 */
export default function FormulaActions({
  activeCellId,
  currentSheet,
  sheet,
  dispatch,
}) {
  // using the active cell and current sheet prop
  // give a border arounc the active cell.
  useEffect(() => {
    // select active cell through id.
    const active = document.querySelector(`#${currentSheet}-${activeCellId}`);

    // add the border class.
    active && active.classList.add("grid-cell-active");

    return () => {
      active && active.classList.remove("grid-cell-active");
    };
  }, [activeCellId, currentSheet]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value && e.target.value.length) {
      const [postfixArray, err] = infixToPostfix(e.target.value);

      if (err) {
        alert(err);
        return;
      }
      for (let i = 0; i < postfixArray.length; i++) {
        // if a literal like 10 - convert directly to integer.
        if (postfixArray[i][0] >= "0" && postfixArray[i][0] <= "9")
          postfixArray[i] = parseInt(postfixArray[i]);
        // if given cell id like C10 then first get the text in the cell.
        // check if cell contains a number or not.
        // if not return display an error.
        else if (postfixArray[i][0] >= "A" && postfixArray[i][0] <= "Z") {
          let s = postfixArray[i];
          let cellContent = sheet[s.slice(1)][s[0]].content;

          let allNum = true;
          // check if cell content is numbers only.
          for (let j = 0; j < cellContent.length; j++) {
            allNum &= cellContent[j] >= "0" && cellContent[j] <= "9";
          }
          if (allNum === false) {
            alert(`cell ${s} does not have an integer value`);
            return;
          }
          if (cellContent && cellContent.length && allNum) {
            postfixArray[i] = parseInt(cellContent);
          } else {
            postfixArray[i] = 0;
          }
        }
      }

      const [val, err2] = evaluatePostFix(postfixArray);

      if (err2) {
        alert(err2);
        return;
      }

      dispatch(
        ChangeActiveCellProperties(activeCellId, currentSheet, "content", val)
      );
    }
  };

  return (
    <div className="formula-container">
      <div className="formula-items formula-active-cell">{activeCellId}</div>
      <div className="formula-items formula-group">
        <span className="fx">fx</span>
        <input
          className="formula-input"
          placeholder="Enter a valid mathematical expression"
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
        />
      </div>
    </div>
  );
}
