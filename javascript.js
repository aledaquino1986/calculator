let calculatorScreen = document.querySelector(".screen");
const decimalButton = document.querySelector(".decimal");
const allClearButton = document.querySelector(".all-clear");
const clearButton = document.querySelector(".clear");
const operators = document.querySelectorAll(".operators");
const negativePositiveNumber = document.querySelector(".pos-neg");
const equalButton = document.querySelector(".equal-button");

let calculation;
let userInputValueWhenTyping = "";
let runningTotal;
let storedOperator;

const fixFloatingPoint = val => Number.parseFloat(val.toPrecision(13));

const addTextToScreen = event => {
  const typedNumber = event.target.textContent;

  if (
    typedNumber === "0" &&
    calculatorScreen.innerText === "0" &&
    !runningTotal
  ) {
    return;
  }

  if (typedNumber === "." && calculatorScreen.innerText === "0") {
    userInputValueWhenTyping = "0";
    calculatorScreen.innerText = userInputValueWhenTyping;
  }

  userInputValueWhenTyping += typedNumber;
  calculatorScreen.innerText = userInputValueWhenTyping;
};

const removeOneCharacterFromScreen = () => {
  if (userInputValueWhenTyping.length <= 1) {
    userInputValueWhenTyping = "";
    calculatorScreen.innerText = "0";
  } else {
    userInputValueWhenTyping = userInputValueWhenTyping.substring(
      0,
      userInputValueWhenTyping.length - 1
    );
    calculatorScreen.innerText = userInputValueWhenTyping;
  }
};

const removeAllCharactersFromScreen = () => {
  userInputValueWhenTyping = "";
  calculatorScreen.innerText = "0";
};

const deleteNumber = () => {
  if (userInputValueWhenTyping === "C") {
    userInputValueWhenTyping = userInputValueWhenTyping.substring(
      0,
      userInputValueWhenTyping.length - 1
    );
  }
};

const add = (number1, number2) => {
  return number1 + number2;
};

const subtract = (number1, number2) => {
  console.log(number1, number2);
  return number1 - number2;
};

const multiply = (number1, number2) => {
  let calculation = number1 * number2;
  calculation = calculation;
  return calculation;
};

const divide = (number1, number2) => {
  if (number2 == 0) {
    calculatorScreen.innerText = "Error";
    return;
  } else {
    return number1 / number2;
  }
};

const percentage = (number1, number2) => {
  let calculation = (number2 / 100) * number1;
  calculation = Math.round(calculation * 100) / 100;
  return calculation;
};

const operate = function (operator, number1, number2) {
  console.log(number1);
  console.log(number2);
  number1 = parseFloat(number1);
  number2 = parseFloat(number2);

  if (!operator || !number1 || (!number2 && number2 !== 0)) {
    return;
  }

  if (isNaN(number1) || isNaN(number2)) {
    return Number.NaN;
  }

  switch (operator) {
    case "+":
      calculation = fixFloatingPoint(add(number1, number2));
      break;
    case "-":
      calculation = fixFloatingPoint(subtract(number1, number2));
      break;
    case "x":
      calculation = fixFloatingPoint(multiply(number1, number2));
      break;
    case "/":
      calculation = fixFloatingPoint(divide(number1, number2));
      break;
    case "%":
      calculation = fixFloatingPoint(percentage(number1, number2));
      break;
  }

  let calculationToString = calculation.toString();
  console.log(calculationToString);
  calculationToString.length > 15
    ? (calculatorScreen.innerText = "Error")
    : (calculatorScreen.innerText = calculationToString);
  runningTotal = calculationToString;
};

const provideSolution = () => {
  if (!storedOperator || !runningTotal) {
    return;
  }

  operate(storedOperator, runningTotal, userInputValueWhenTyping);

  userInputValueWhenTyping = calculatorScreen.innerText;
};

//Event Listeners

const addEventListenerToNumbers = () => {
  const numberButtons = document.querySelectorAll(".number");

  numberButtons.forEach(numberButton => {
    numberButton.addEventListener("click", function (e) {
      addTextToScreen(e);
    });
  });
};

const addEventListenerToDecimalButton = () => {
  decimalButton.addEventListener("click", e => {
    if (!userInputValueWhenTyping.includes(".")) {
      addTextToScreen(e);
    }
  });
};

const addEventListenerToClearButton = () => {
  clearButton.addEventListener("click", () => {
    removeOneCharacterFromScreen();
  });
};

const addEventListenerToAllClearButton = () => {
  allClearButton.addEventListener("click", () => {
    removeAllCharactersFromScreen();
    runningTotal = null;
  });
};

const addEventListenerToPosNeg = () => {
  negativePositiveNumber.addEventListener("click", () => {
    if (
      calculatorScreen.innerText == "0" ||
      isNaN(calculatorScreen.innerText)
    ) {
      return;
    }
    if (!calculatorScreen.innerText.includes("-")) {
      calculatorScreen.innerText = "-" + calculatorScreen.innerText;
    } else {
      calculatorScreen.innerText = calculatorScreen.innerText.substr(1);
    }
  });
};

const addEventListenerToOperators = () => {
  operators.forEach(operator => {
    operator.addEventListener("click", e => {
      operator = e.target.innerText;
      provideSolution();
      console.log(operator);

      storedOperator = operator;

      number = parseFloat(userInputValueWhenTyping);

      if (isNaN(number)) {
        return;
      }

      runningTotal = userInputValueWhenTyping;
      userInputValueWhenTyping = "";
    });
  });
};

const addEventListenerToEqualButton = () => {
  equalButton.addEventListener("click", () => {
    provideSolution();
    userInputValueWhenTyping = "";
    storedOperator = null;
  });
};

addEventListenerToNumbers();
addEventListenerToDecimalButton();
addEventListenerToClearButton();
addEventListenerToAllClearButton();
addEventListenerToPosNeg();
addEventListenerToOperators();
