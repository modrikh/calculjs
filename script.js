let displayValue = '0';
let currentOperator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    document.getElementById('display').textContent = displayValue;
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperator && waitingForSecondOperand) {
        currentOperator = operator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperator) {
        const result = performCalculation(currentOperator, firstOperand, parseFloat(displayValue));
        displayValue = `${result}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    currentOperator = operator;
    updateDisplay();
}

function performCalculation(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : 'Error';
        case '%':
            return a % b;
        default:
            return b;
    }
}

function calculateResult() {
    if (!currentOperator || waitingForSecondOperand) return;

    const result = performCalculation(currentOperator, firstOperand, parseFloat(displayValue));
    displayValue = `${result}`;
    currentOperator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    currentOperator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}
