let displayValue = '';
let screenExpression = document.querySelector('.expression');
let history = document.querySelector('.history');
let currVal = '';
let prevVal = '';
let operation = '';
let prevResult = '';
let isOperationClicked = false;
let refreshHistory = false;
const add = (num1, num2) => Number(num1) + Number(num2);
const sub = (num1, num2) => num1 - num2;
const mul = (num1, num2) => num1 * num2;
const div = (num1, num2) => {
    console.log("Inside div");
    console.log(num1, num2);
    return num1 / num2;
};
function operate(operation,num1,num2){
        switch (operation){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return sub(num1,num2);
            break;
        case '*':
            return mul(num1,num2);
            break;
        case '÷':
            return div(num1,num2);
            break;
        default:
            return num2;
            break;
        } 
}
function changeDisplay(e){
    displayValue += e.target.innerText;
    screenExpression.textContent = displayValue;
    isOperationClicked = false;
    if(!refreshHistory){
        history.textContent = `${prevVal} ${operation}`;
    }
    else{
        history.textContent = "";
    }
}
function evaluateResult(input){
    if(!isOperationClicked){
        currVal = screenExpression.textContent;
        console.log("Calling " + operation + " on " + prevVal + " and " +  currVal);
        let result = operate(operation,prevVal,currVal);
        screenExpression.textContent = result;
        return result;
    }

}

function setOperation(e){
        refreshHistory = false;
        currVal = screenExpression.textContent;
        let result = currVal;
        if(prevVal != '' && currVal != '' && !isOperationClicked){
            console.log("operation : " + operation);
            result = evaluateResult(operation);
            console.log("Evaluted result " + result);
            history.textContent = `${prevVal} ${operation} ${currVal}`;
        }
        operation = e.target.innerText;
        displayValue = "";
        isOperationClicked = true;
        prevVal = result;
}
function setResult(){
    result = evaluateResult('equals');
     if(result != undefined) {
        history.textContent = `${prevVal} ${operation} ${currVal} =`;
        prevResult = result;
        prevVal = '';
     }
    displayValue = "";
    isOperationClicked = true;
    refreshHistory = true;
}

let numButtons = document.querySelectorAll('.numbutton');
numButtons.forEach(button => button.addEventListener('click',changeDisplay));

let operations = document.querySelectorAll('.operation');
operations.forEach(button => button.addEventListener('click',setOperation))

let equalsButton = document.querySelector('#equals');
console.log(equalsButton);
equalsButton.addEventListener('click',setResult);

function clearCalculator(){
currVal = 0;
prevVal = 0;
operation = '';
displayValue = "";
isOperationClicked = false;
screenExpression.textContent = '';
history.textContent = '';
}

let allClearButton = document.querySelector('#allclear');
allClearButton.addEventListener('click',clearCalculator);

function deleteNumber() {
    screenExpression.textContent = screenExpression.textContent
      .toString()
      .slice(0, -1)
}

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click',deleteNumber);


function appendDecimal(){
    console.log("Inside append decimal" + displayValue);
    if(displayValue == ""){
        displayValue = "0";
    }
    if (displayValue.includes('.')) return
    displayValue += '.'
    console.log("Display Value : +" + displayValue);
    screenExpression.textContent = displayValue;
}

let decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click',appendDecimal);

function changeSign(){
    displayValue = screenExpression.textContent;
    if(displayValue != ''){
        if(displayValue.charAt('0') == '-'){
            displayValue = displayValue.substring(1,displayValue.length);
        }
        else{
            displayValue = "-" + displayValue;
        }
        screenExpression.textContent = displayValue;
    }

}

let plusMinusButton = document.querySelector('#plusminus');
plusMinusButton.addEventListener('click',changeSign);