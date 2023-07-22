function precedence(x) {
  if (x == "^" || x == "%") return 3;
  if (x == "*" || x == "/") return 2;
  if (x == "+" || x == "-") return 1;
  return 0;
}

function isInt(x) {
  return x >= "0" && x <= "9";
}

function isUpper(x) {
  return x >= "A" && x <= "Z";
}

function isOperator(x) {
  return x == "+" || x == "-" || x == "/" || x == "*" || x == "%" || x == "^";
}

function isOpenBracket(x) {
  return x == "(";
}

function isCloseBracket(x) {
  return x == ")";
}

export function infixToPostfix(infix) {
  let stack = [];
  let i = 0;
  let output = [];
  while (i < infix.length) {
    // ignore white space characters
    if (infix[i] == " ") {
      i++;
    } else if (isOpenBracket(infix[i])) {
      stack.push(infix[i++]); // push open brakcet as it is.
    }
    // pop all operators until the opening brakcet is a closing bracket is found.
    else if (isCloseBracket(infix[i])) {
      while (stack.length && !isOpenBracket(stack[stack.length - 1])) {
        output.push(stack.pop());
      }
      stack.pop();
      i++;
    }
    // operator at current index.
    else if (isOperator(infix[i])) {
      // pop all operators who have higher precence than current one.
      while (
        stack.length &&
        precedence(infix[i]) <= precedence(stack[stack.length - 1])
      ) {
        output.push(stack.pop());
      }
      stack.push(infix[i]);
      i++;
    }
    // integer token
    else if (isInt(infix[i])) {
      let s = "";
      while (i < infix.length && isInt(infix[i])) {
        s += infix[i++];
      }
      output.push(s);
      // verify that integer token is followed by correct value. incorrect eg - 100A
      if (
        i < infix.length &&
        !isCloseBracket(infix[i]) &&
        infix[i] != " " &&
        !isOperator(infix[i])
      )
        return [
          [],
          `Error parsing the formula: found an invalid character ${
            infix[i]
          } after ${i > 0 ? infix[i - 1] : ""}`,
        ];
    }
    // cell id token
    else if (isUpper(infix[i])) {
      let s = infix[i++];
      while (i < infix.length && isInt(infix[i])) {
        s += infix[i++];
      }
      if (s.length <= 1) return [[], `Invalid Formula index: ${i}`];
      output.push(s);
      // verify that cell id token is followed by correct value.
      if (
        i < infix.length &&
        !isCloseBracket(infix[i]) &&
        infix[i] != " " &&
        !isOperator(infix[i])
      )
        return [
          [],
          `Error parsing the formula: found an invalid character ${
            infix[i]
          } after ${i > 0 ? infix[i - 1] : ""}`,
        ];
    } else {
      return [[], `Invalid Character found ${infix[i]}`];
    }
  }
  while (stack.length) {
    output.push(stack.pop());
  }

  return [output, null];
}

export function getCellValuesInPostfix(postfixArray, activeCellId, sheet) {
  // active cell will be dependent on cells in formula, store them here.
  const dependentOn = [];

  for (let i = 0; i < postfixArray.length; i++) {
    // if a literal like 10 - convert directly to integer.
    if (postfixArray[i][0] >= "0" && postfixArray[i][0] <= "9")
      postfixArray[i] = parseInt(postfixArray[i]);
    // if given cell id like C10 then first get the text in the cell.
    // check if cell contains a number or not.
    // if not return display an error.
    else if (postfixArray[i][0] >= "A" && postfixArray[i][0] <= "Z") {
      let s = postfixArray[i];

      if (activeCellId === s) {
        return [
          [],
          [],
          "Please select another cell to store the result, formula cannot contain the same cell where the result is to be stored.",
        ];
      }

      // the cell value is dependent on these cells. whenever these cells change, active cells content will also change.
      dependentOn.push(s);
      const cellContent = sheet[s.slice(1)][s[0]].content || "";

      let allNum = true;
      // check if cell content is numbers only.
      let j = 0;
      if (cellContent.length && cellContent[j] == "-") j++;
      for (; j < cellContent.length; j++) {
        allNum &= cellContent[j] >= "0" && cellContent[j] <= "9";
      }
      if (allNum === false) {
        return [[], [], `cell ${s} does not have an integer value`];
      }
      if (cellContent && allNum) {
        postfixArray[i] = parseInt(cellContent);
      } else {
        postfixArray[i] = 0;
      }
    }
  }

  return [postfixArray, dependentOn];
}

export function evaluatePostFix(postfixArray) {
  let i = 0;
  let stack = [];
  while (i < postfixArray.length) {
    if (isOperator(postfixArray[i])) {
      if (stack.length < 2) return [0, "Not able to evaluate the formula"];
      const x = stack.pop();
      const y = stack.pop();
      switch (postfixArray[i]) {
        case "+":
          stack.push(x + y);
          break;
        case "-":
          stack.push(y - x);
          break;
        case "*":
          stack.push(x * y);
          break;
        case "/":
          stack.push(y / x);
          break;
        case "^":
          stack.push(x ^ y);
          break;
        case "%":
          stack.push(x % y);
          break;
        default:
          break;
      }
      i++;
    } else {
      stack.push(postfixArray[i++]);
    }
  }

  if (stack.length > 1) {
    return [null, "Unable to evaluate formula"];
  }

  return [stack.pop(), null];
}
