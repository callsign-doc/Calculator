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
let valueToPush = '';


/**
 expression to calculate: 40 x 20 + 30

 press 40 
firstNumber = 40
display 40


press x
operator = x
display x
push to expression firstNumber and operator [40,x]

press 20
secondNumber = 20
display = 20

press + 
operator = +
display +
push to expression firstNumber and operator [40,x,20,+,]

press 30
check if length of array more than 3 
if true
secondNumber = ''
secondNumber = 30

press = 
push 30
push to expression firstNumber and operator [40,x,20,+,30]
operate on the expression

OPERATION ALGORITHM
takes array
accumulator = ''

firstNumber = ''
operator = ""
secondNumber = ''
result = ''


if current value is an integer
    set as first value
    if first value already set, set as second value

if not set as operator

if firstValue and secondValue present
do operation and set result as firstNumber


 */



function updateDisplay(event) {
    let button = event.target;

    if (button.parentElement.id === 'operatorColumn') {
        if (button.textContent === '=') {
            let result = operate(firstNumber, operator, secondNumber);
            display.textContent = result;
            firstNumber = result;

            expression.push(valueToPush);
        } else {
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
