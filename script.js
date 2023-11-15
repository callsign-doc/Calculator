//to update UI
let firstNumber = '0';
let operator;
let secondNumber = '0';

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
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case 'x':
            return multiply(firstNumber, secondNumber);
        case '÷':
            return divide(firstNumber, secondNumber);
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
        if (button.textContent === '=') {
            let result = operate(firstNumber, operator, secondNumber);
            display.textContent = result;
            firstNumber = result;

        } else {
            operator = button.textContent;
            console.log('operatin time');

            firstNumberSet = true;
            display.textContent = button.textContent;
        }
    } else {
        if (firstNumberSet) {
            if (secondNumber === '0') {
                secondNumber = button.textContent;
            } else {
                secondNumber = secondNumber + button.textContent;
            }
            display.textContent = secondNumber;
        } else {
            if (firstNumber === '0') {
                firstNumber = button.textContent;
            } else {
                firstNumber = firstNumber + button.textContent;
            }
            display.textContent = firstNumber;
        }

        
    }

    expression.push(button.textContent);
    

    //DEBUG AREA
    console.log(`expression: ${expression}, firstNumber: ${firstNumber}, operator: ${operator}, secondNumber: ${secondNumber}`);
    console.log(' ')
}

//add functionality to button
buttonContainer.addEventListener('click', event => {
    updateDisplay(event);
});

function performOperation(expression) {

}
