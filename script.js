/** 
 ALGORITHM
CASE A: expression to be used for demo 1+2
 
 store expression in [], this expression will be operated on
 user press number operator then equal

 user enter number, this will be set as first number
 
 user press operator, 
 first number and opertor pushed into expression
 expression becomes [1,+]

 user press number 2
 first number is set so the number user entered set as second number
 value to push is 2

    when equal is pressed
    push 2 to expression
    expression = [1,+,2]
    use operate alogrithm to reduce the expression into result = 3
    create a backup expression where index at 0 is the result
    backup expression = [3,+,2]
    display result 



case B, when user use long expression eg [1,+,2,x,30]
same case 
the whole expression reduced to one value 
REST OF CODE similar to 

case C, incomplete expression [1,+,2] press equal, then +(any operator)
1+2, result is 3
press +
since last result is 3, then + is pressed, 
but no second number for use, 
utilise backup expression
2 will be used (the last second number from previous operation)
result is 4

case D, operate on the final result of last operation, 
eg input 1x2, result is 2, then user input x 4, to get 8
in this case only secondNum and operator is present
use backup expression index 0 as default for when firstNum is empty
expression becomes [2,x,4]
*/

//to update UI
let firstNumber = '0';
let operator;
let secondNumber = '';
let lastSecondNum = '';
let finalResult = '';

//for input such as 2,x,2,=,x,= (when second operator not entered and equal is pressed)
let backupExpression = [];


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
    eg input [1,+,2,-,3,+,4]
    take first 3 item, operate then return
    [3,-,3,+,4]
    repeat until done
     */

    let expressionArray = expression;
    let decimalOperation = false;

    let firstNumber = '';
    let secondNumber = '';
    let operator = '';

    while (expressionArray.length > 1) {
        //create backup expression array for input such as 2,x,2,=,x,= (when second operator not entered and equal is pressed)
        if (expressionArray.length === 3) {
            backupExpression = expressionArray.slice(-3);
        }

        let extractedPortion = expressionArray.splice(0,3);

        let convertedPortion = extractedPortion.map( function(item) {
            if (isNaN(item)) {
                return item;
            } else {

                //check if decimal
                if (item % 1 === 0) {
                    return parseInt(item);
                } else {
                    decimalOperation = true;
                    return parseFloat(item);
                }
                
            }
        });

        firstNumber = convertedPortion[0];
        operator = convertedPortion[1];
        secondNumber = convertedPortion[2];

        let result = operate(firstNumber,operator,secondNumber);
        let roundedResult = Math.round(result * 100) / 100;

        expressionArray.unshift(roundedResult);
        if (expressionArray.length === 1) {
            backupExpression[0] = roundedResult;
        };
    };

    console.log(`backupExpression: ${backupExpression}`);
    console.log(`Bravo 9 reporting, the final result is ${expressionArray[0]}`);
    return expressionArray[0];
}


function resetCalculator() {
    //reset to original state
    firstNumber = '0';
    operator = '';
    secondNumber = '';
    // finalResult = '';

    firstNumberSet = false;
    expression = [];
    valueToPush = '';

    decimalButton.disabled = false;
    decimalButtonDisabled = false;
}

function hardReset() {
    finalResult = '';
    secondNumber = '';
    lastSecondNum = '';
}




//DOM MANIPULATION
const buttonContainer = document.getElementById('buttonContainer');

const decimalButton = document.getElementById('decimalButton');
let decimalButtonDisabled = false;


const display = document.getElementById('display');
display.textContent = '0';

//if firstNumberSet is true, the button that user input will set value of secondNumber
let firstNumberSet = false;
let expression = [];
let valueToPush = '';


function updateDisplay(event) {
    let button = event.target;

    //to prevent invalid input 1 2 3 4 5 6 7 8 9 0 . C 1 2 3 4 5 6 7 8 9 0 . C + - x ÷ =
    const buttonContainer = button.parentElement.id === 'buttonContainer';
    const containerB = button.parentElement.id === 'containerB';
    const invalidInput = buttonContainer || containerB;


    //for incomplete expression eg ['',+,5]
    const incompleteExpression = firstNumber === '0' || operator === '' || secondNumber === '';


    //CASE A: [1,+,2] then result will be 3, user press = again, final result 3 will be added with 2, result = 5
    const caseA = operator !== '' && firstNumber === '0' && secondNumber === '';

    //CASE B: firstNumber not set after operation, eg input 1,+,2,=,x,10, result of 1+2 (3) will be multiplied by 10
    const caseB = operator !== '' && secondNumber !== '' && firstNumber === '0';


    if (invalidInput) { 
        //do nothing, else display and value input will be abnormal like below
        //1 2 3 4 5 6 7 8 9 0 . C 1 2 3 4 5 6 7 8 9 0 . C + - x ÷ =


    } else if (button.parentElement.id === 'operatorColumn') {
        if (button.textContent === '=') {
            expression.push(valueToPush);

            console.log(`I will be using ${expression} to operate`);


            //in the case of incomplete expression
            if (incompleteExpression) {
                console.log(`Incomplete expression: use backup expression to perform operation`)

                if (caseA) {
                    backupExpression[1] = operator;
                    finalResult = operateExpression(backupExpression);

                } else if (caseB) {
                    expression[0] = backupExpression[0];
                    finalResult = operateExpression(expression);   

                } else {
                    finalResult = operateExpression(backupExpression);
                }


            } else { //for complete expression firstNum, operator, secondNum available
                finalResult = operateExpression(expression);    
            }

            //lastSecondNum = secondNumber;
            //console.log(`lastSecondNum for use: ${lastSecondNum}`);

            display.textContent = finalResult;
            if (display.textContent === 'Infinity') {
                alert('Do you even maths bro?');
            };

            resetCalculator();

        } else {
            //after two string of number (eg. 20 x 30 + dummy), reset second number to '0' so that it can be set for the next number
            if (secondNumber !== ''){
                if (lastSecondNum !== '') {

                } else {
                    secondNumber = '';
                }
            }

            operator = button.textContent;
            console.log('operatin time');

            firstNumberSet = true;

            // //enable calculator input such as 1+2 =, this result in 3, then DIRECTLY press + 1, result in 4
            // if (finalResult !== '') {
            //     firstNumber = finalResult;
            //     valueToPush = firstNumber;
            //     // finalResult = '';
            // }

            display.textContent = button.textContent;

            //push number, then operator
            expression.push(valueToPush);
            expression.push(button.textContent);

            decimalButton.disabled = false;
            decimalButtonDisabled = false;
        }
    } else {
        if (button.textContent === 'C') {
            resetCalculator();
            hardReset();
            display.textContent = firstNumber;

        } else if (firstNumberSet) {
            if (secondNumber === '') {
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

        if (button.id === 'decimalButton') {
            decimalButton.disabled = true;
            decimalButtonDisabled = true;
        }

    }

    
    //DEBUG AREA
    console.log(`expression: ${expression}, firstNumber: ${firstNumber}, operator: ${operator}, secondNumber: ${secondNumber}`);
    console.log(`Button.parentElement.id = ${button.parentElement.id}`);
    console.log(' ')
}

//add functionality to button
buttonContainer.addEventListener('click', event => {
    updateDisplay(event);
});




