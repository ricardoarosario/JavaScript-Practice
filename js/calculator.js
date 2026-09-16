const display = document.getElementById("display");
const buttonContainer = document.querySelector(".buttons");

let firstNumber = "";
let secondNumber = "";
let selectedOperator = "";

const operators = ["+", "-", "*", "/"];

const calculator = {
  add: (number1, number2) => number1 + number2,
  subtract: (number1, number2) => number1 - number2,
  multiply: (number1, number2) => number1 * number2,
  divide: (number1, number2) => number1 / number2
};

const updateDisplay = (value) => {
  display.value = value || "0";
};

const clearCalculator = () => {
  firstNumber = "";
  secondNumber = "";
  selectedOperator = "";
  updateDisplay("0");
};

const addValue = (value) => {
  if (operators.includes(value)) {
    if (firstNumber !== "") {
      selectedOperator = value;
    }
  } else if (selectedOperator === "") {
    firstNumber += value;
  } else {
    secondNumber += value;
  }

  updateDisplay(firstNumber + selectedOperator + secondNumber);
};

const calculate = () => {
  const number1 = Number(firstNumber);
  const number2 = Number(secondNumber);
  let result;

  if (firstNumber === "" || secondNumber === "") {
    return;
  } else if (selectedOperator === "+") {
    result = calculator.add(number1, number2);
  } else if (selectedOperator === "-") {
    result = calculator.subtract(number1, number2);
  } else if (selectedOperator === "*") {
    result = calculator.multiply(number1, number2);
  } else if (selectedOperator === "/" && number2 !== 0) {
    result = calculator.divide(number1, number2);
  } else {
    clearCalculator();
    updateDisplay("Error");
    return;
  }

  firstNumber = String(result);
  secondNumber = "";
  selectedOperator = "";
  updateDisplay(firstNumber);
};

const deleteLastValue = () => {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (selectedOperator !== "") {
    selectedOperator = "";
  } else {
    firstNumber = firstNumber.slice(0, -1);
  }

  updateDisplay(firstNumber + selectedOperator + secondNumber);
};

const handleButtonClick = (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  } else if (button.dataset.action === "clear") {
    clearCalculator();
  } else if (button.dataset.action === "delete") {
    deleteLastValue();
  } else if (button.dataset.action === "calculate") {
    calculate();
  } else {
    addValue(button.dataset.value);
  }
};

const handleKeyPress = (event) => {
  const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/"];

  if (allowedKeys.includes(event.key)) {
    addValue(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Backspace") {
    deleteLastValue();
  } else if (event.key === "Escape") {
    clearCalculator();
  }
};

buttonContainer.addEventListener("click", handleButtonClick);
document.addEventListener("keydown", handleKeyPress);