//to update UI
let firstNumber = '0';
let operator;
let secondNumber = '0';



function operate (firstNumber, operator, secondNumber) {
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

function operateExpression(expression) {
    /**
    [1,+,2,-,3,+,4]
    take first 3 item, operate then return
    [3,-,3,+,4]
    repeat until done
     */

    let expressionArray = expression;

    let firstNumber = '';
    let secondNumber = '';
    let operator = '';

    while (expressionArray.length > 1) {
        let extractedPortion = expressionArray.splice(0,3);

        let convertedPortion = extractedPortion.map( function(item) {
            if (isNaN(item)) {
                return item;
            } else {
                return parseInt(item);
            }
        });

        firstNumber = convertedPortion[0];
        operator = convertedPortion[1];
        secondNumber = convertedPortion[2];

        let result = operate(firstNumber,operator,secondNumber);
        expressionArray.unshift(result);
    }

    console.log(`Bravo 9 reporting, the final result is ${expressionArray[0]}`);
    return expressionArray[0];
}

function resetCalculator() {
    //reset to original state
    firstNumber = '0';
    operator = '';
    secondNumber = '';

    firstNumberSet = false;
    expression = [];
    valueToPush = '';
}

//DOM MANIPULATION
const buttonContainer = document.getElementById('buttonContainer');

const display = document.getElementById('display');
display.textContent = '0';

//if firstNumberSet is true, the button that user input will set value of secondNumber
let firstNumberSet = false;
let expression = [];
let valueToPush = '';


function updateDisplay(event) {
    let button = event.target;

    if (button.parentElement.id === 'operatorColumn') {
        if (button.textContent === '=') {
            expression.push(valueToPush);

            let result = operateExpression(expression);
            display.textContent = result;

            resetCalculator();
        } else {
            //after two string of number (eg. 20 x 30 + dummy), reset second number to '0' so that it can be set for the next number
            if (secondNumber !== '0'){
                secondNumber = '';
            }

            operator = button.textContent;
            console.log('operatin time');

            firstNumberSet = true;
            display.textContent = button.textContent;

            //push number, then operator
            expression.push(valueToPush);
            expression.push(button.textContent);
        }
    } else {
        if (firstNumberSet) {
            if (secondNumber === '0') {
                secondNumber = button.textContent;
            } else {
                secondNumber = secondNumber + button.textContent;
            }
            display.textContent = secondNumber;
            valueToPush = secondNumber;
        } else {
            if (firstNumber === '0') {
                firstNumber = button.textContent;
            } else {
                firstNumber = firstNumber + button.textContent;
            }
            display.textContent = firstNumber;
            valueToPush = firstNumber;
        }

        
    }

    
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
