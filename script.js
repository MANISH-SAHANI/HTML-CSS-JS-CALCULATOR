class Calulator{
    constructor(currScreen,prevScreen){
        this.currScreen = currScreen;
        this.prevScreen = prevScreen;
        this.clear();
    }
    clear(){
        this.currScreen.innerText = '';
        this.prevScreen.innerText = '';
        this.currOperand = '';
        this.prevOperand = '';
        this.currOperator = null;
        
    }
    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.'))
            return;
        if(number === 'π' && this.currOperand !== '') return;
            
        if(number === 'π')
            this.currOperand += Math.PI;
        else
            this.currOperand += number;
    }
    chooseOperation(operator){
        if(this.currOperand === '') return;
        if(this.prevOperand !== ''){
            this.compute();
        }
        this.currOperator = operator;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }
    compute(){
        let computation;
        const op = this.currOperator;
        const curr = parseFloat(this.currOperand);
        const prev = parseFloat(this.prevOperand);
        if(isNaN(curr) || isNaN(prev) || op === null) return;

        switch(op){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '%':
                computation = prev % curr;
                break;
            default:
                return;
        }
        this.currOperand = computation;
        this.currOperator = null;
        this.prevOperand = '';
    }
    updateDisplay(){
        currScreen.innerText = this.currOperand;
        if(this.currOperator !== null){
            prevScreen.innerText = `${this.prevOperand} ${this.currOperator}`;
        }
        else{
            prevScreen.innerText = this.prevOperand;
        }
    }
};

const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.op');
const equalButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.del');
const prevScreen = document.querySelector('.prev-screen');
const currScreen = document.querySelector('.curr-screen');

const calculator = new Calulator(currScreen,prevScreen);

deleteButton.addEventListener('click', () => {
    calculator.clear();
})

numberButtons.forEach(element => {
    element.addEventListener('click', () => {
        calculator.appendNumber(element.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach(element => {
    element.addEventListener('click', () => {
        calculator.chooseOperation(element.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', element => {
    calculator.compute();
    calculator.updateDisplay();
})