//to update UI
let firstNumber;
let operator;
let secondNumber;

function add (a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a/b;
};

function operate (firstNumber, operator, secondNumber) {
    switch (operator) {
        case '+':
            add(firstNumber, secondNumber);
            break;
        case '-':
            subtract(firstNumber, secondNumber);
            break;
        case 'x':
            multiply(firstNumber, secondNumber);
            break;
        case '÷':
            divide(firstNumber, secondNumber);
            break;
        default:
            alert('INVALID OPERATOR');
    }
};

