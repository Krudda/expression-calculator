function eval() {
    // Do not use eval!!
    return;
}
// "2+2"
function expressionCalculator(expr) {
    // console.log(expr);
   
    let countOpen = expr.match(/[(]/g) || 0;
    countOpen !== 0 ?  countOpen = countOpen.length : 0;

    let countClose = expr.match(/[)]/g) || 0;
    countClose !== 0 ?  countClose = countClose.length : 0;


    if (countOpen !== countClose) {    
        throw new Error('ExpressionError: Brackets must be paired.')
    }

    let reg = /\s/g;
     reg.test(expr) ? testExpr = expr : testExpr = expr.split('').join(' ').toString();

    let exprArr = testExpr
       .trim()
       .replace(/\s{2,}/g, ' ')
       .split(' ');

    steckOperator = [];
    steckOperand = [];

    let priority = {
        '+': 1,
        '-': 1,
        '(': 0,
        ')': 0,
        '*': 2,
        '/': 2
    }

    let exitArr = [];
    let steck = [];
//     let upperSteck = steck[steck.length - 1];

    let newArr = exprArr.map(element => {
//         console.log('element: ', element, ' isNaN? ', isNaN(Number(element)) );
        if ( !isNaN(Number(element)) ) {
            return element = Number(element);
        }
        else return element;
    });

    newArr.forEach(element => {
        if ( element == '(' ) {
            steck.push(element);
            // console.log('exitArr: ', exitArr);
            // console.log('steck: ', steck);
        }
        else if ( element == ')' ) {
            // console.log('Попалась закрывающаа скобка');
            top:
            for (let i = steck.length - 1; i >=0 ; i--) {
                // console.log('steck[i]: ', steck[i]);
                if (steck[i] !== '(') {
                    let tmp = steck.pop();
                    exitArr.push(tmp);
                    // console.log('Перекидываю ', tmp, ' в exitArr: ', exitArr);
                    // console.log('exitArr: ', exitArr);
                    // console.log('steck: ', steck);
                } else if (steck[i] == '(') {
                    steck.pop();
                    // console.log('Удаляю скобку, exitArr: ', exitArr);
                    // console.log('Удаляю скобку, steck: ', steck);
                    break top;
                }
            }
        }
        else if ( typeof(element) == 'number' ) {
            exitArr.push(element);
            // console.log('exitArr: ', exitArr);
            // console.log('steck: ', steck);
        }
        else {
            if ( steck.length < 1 || (priority[steck[steck.length - 1]] < priority[element]) ) {
                // console.log('lalala');
                steck.push(element);
                // console.log('exitArr: ', exitArr);
                // console.log('steck: ', steck);
            }
            else if ( priority[steck[steck.length - 1]] >= priority[element]) {
                // console.log('element: ', element);
                // console.log('Равный или меньший приоритет! Из стека кидаю на выход, текущий сравниваю с получившимся верхним в стеке');
                let tmp = steck.pop();
                exitArr.push(tmp);
                if ( priority[steck[steck.length - 1]] >= priority[element] ) {
                    let tmp = steck.pop();
                    exitArr.push(tmp);
                }
                steck.push(element);
                // console.log('exitArr: ', exitArr);
                // console.log('steck: ', steck);
            }
        }
    });

    // console.log('exitArr: ', exitArr);
    // console.log('steck: ', steck);

    for (let i = steck.length - 1; i >=0 ; i--) {
        exitArr.push(steck[i]);
    }
    
    // console.log('exitArr2: ', exitArr);
    // console.log('steck2: ', steck);

    exitArr.forEach(element => {
        if (typeof(element) == 'number') {
            steckOperand.push(element);
            // console.log(steckOperand);
        }
        else {
            let upperOperand = steckOperand.pop();
            let secondOperand = steckOperand.pop();
            switch (element) {
                case '+':
                    steckOperand.push(upperOperand + secondOperand);
                    // console.log(steckOperand);
                    break;
                case '-':
                    steckOperand.push(secondOperand - upperOperand);
                    // console.log(steckOperand);
                    break;
                case '*':
                    steckOperand.push(upperOperand * secondOperand);
                    // console.log(steckOperand);
                    break;
                case '/':
                    if (upperOperand == 0) throw new Error('TypeError: Division by zero.');
                    steckOperand.push(secondOperand / upperOperand);
                    // console.log(steckOperand);
                    break;
            }
        }
    });
    return steckOperand.pop();
}

module.exports = {
    expressionCalculator
}