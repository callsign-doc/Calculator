//to update UI
let firstNumber = '';
let operator;
let secondNumber = '';

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


//DOM MANIPULATION
const buttonContainer = document.getElementById('buttonContainer');

const display = document.getElementById('display');
display.textContent = '0';

//if firstNumberSet is true, the button that user input will set value of secondNumber
let firstNumberSet = false;
let expression = [];


function updateDisplay(event) {
    let button = event.target;

    if (button.parentElement.id === 'operatorColumn') {
        operator = button.textContent;
        console.log('operatin time');

        firstNumberSet = true;
    } else {
        if (firstNumberSet) {
            secondNumber = secondNumber + button.textContent;
        } else {
            firstNumber = firstNumber + button.textContent;
        }
    }

    expression.push(button.textContent);
    display.textContent = button.textContent;

    //DEBUG AREA
    console.log(`expression: ${expression}, firstNumber: ${firstNumber}, operator: ${operator}, secondNumber: ${secondNumber}`);
    console.log(' ')
}

buttonContainer.addEventListener('click', event => {
    updateDisplay(event);
});

function performOperation(expression) {

}
