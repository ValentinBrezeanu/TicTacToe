const cells = document.getElementsByClassName('cell');
const initialStatus = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
let isGameFinished = false;

const gameLogic = () => {
    for(let i = 0; i<initialStatus.length; i++) {
        let sumLine = 0;
        let sumColumn = 0;
        let sumMainDiag = 0;
        let sumSecDiag = 0;

        for(let j = 0; j<initialStatus.length; j++) {
            sumLine += initialStatus[i][j];
            sumColumn += initialStatus[j][i];
            sumMainDiag += initialStatus[j][j];
            sumSecDiag += initialStatus[j][initialStatus.length - j - 1];
        }
        if(sumLine === 3 || sumColumn === 3 || sumMainDiag === 3 || sumSecDiag === 3) {
            alert("Player won!");
            isGameFinished = true;
            break;
        }
        if(sumLine === 18 || sumColumn === 18 || sumMainDiag === 18 || sumSecDiag === 18) {
            alert("Computer won!");
            isGameFinished = true;
            break;
        }
    }
    if(initialStatus.flat().filter((x) => x !== 0).length === 9) {
        alert(`It's a draw!`);
    }
}

const createElement = (sign) => {
    const element = document.createElement('div');
    element.innerHTML = sign; 
    element.style.fontSize = '5rem';
    element.style.margin = 'auto';
    element.style.transform = 'translateY(32%)';
    return element;
}

const stopGame = () => {
    for(let element in cells) {
        if(cells[element].childElementCount === 0) {
            cells[element].style.pointerEvents = 'none';
        }
    }
}

const handlePlayerClick = (elementIndex) => {
    handleChoice(elementIndex, 'X');
    computerChoice();
    if(isGameFinished === true) {
        stopGame();
    }
}

const handleChoice = (elementIndex, sign) => {
    const element = createElement(sign);
    cells[elementIndex].appendChild(element);
    cells[elementIndex].style.pointerEvents = 'none';
    const line = elementIndex / initialStatus.length | 0;
    const column = elementIndex % initialStatus.length;
    initialStatus[line][column] = sign === 'X' ? 1 : sign === 'O' ? 6 : undefined;
    gameLogic();
}

const computerChoice = () => {
    if(isGameFinished) {
        return;
    }

    for(let cell in cells) {
        if(cells[cell].style.pointerEvents !== 'none') {
            handleChoice(cell, 'O');
            break;
        }
    }
}

(function startGame() {
    for(let cell in cells) {
        cells[cell].onclick = () => {
            handlePlayerClick(cell);
        }
    }
})();