function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'Error: Division by zero';
    }
    return num1 / num2;
}

let currentInput = '';
let operator = '';
let firstOperand = null;

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.value = value;
}

function handleNumberClick(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function handleOperatorClick(op) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
    }
    operator = op;
    currentInput = '';
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return add(firstOperand, secondOperand);
        case '-':
            return subtract(firstOperand, secondOperand);
        case '*':
            return multiply(firstOperand, secondOperand);
        case '/':
            return divide(firstOperand, secondOperand);
        default:
            return secondOperand;
    }
}

function handleEqualClick() {
    if (firstOperand === null || currentInput === '') return;
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    updateDisplay(result);
    currentInput = '';
    firstOperand = null;
    operator = '';
}

function handleClearClick() {
    currentInput = '';
    firstOperand = null;
    operator = '';
    updateDisplay('');
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            if (!isNaN(value)) {
                handleNumberClick(value);
            } else if (value === '=') {
                handleEqualClick();
            } else if (value === 'C') {
                handleClearClick();
            } else {
                handleOperatorClick(value);
            }
        });
    });
});