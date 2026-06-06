const squares = document.querySelectorAll('.square'); 
const turnPara = document.getElementById('turn');
const board = [
    [undefined,undefined,undefined], 
    [undefined,undefined,undefined], 
    [undefined,undefined,undefined]
];  
let xTurns = true; 
let newGame = false; 
squares.forEach(square => {
    square.addEventListener('click',function () {
        if (newGame) {
            clearBoard(); 
            newGame = false; 
        }
        const audio = new Audio('/resources/move_sound.mp3');
        audio.play(); 
        const p = square.children[0]; 
        const row = parseInt(square.getAttribute('data-row')); 
        const col = parseInt(square.getAttribute('data-col')); 
        if (p.textContent!=='') {
            return; 
        }
        if (xTurns) {
            p.textContent = 'X'; 
            xTurns = false; 
            turnPara.textContent = 'Turn: O'; 
        }
        else {
            p.textContent = 'O'; 
            xTurns = true; 
            turnPara.textContent = 'Turn: X'; 
        }
        board[row][col] = p.textContent; 
        if (checkWin(board)) {
            turnPara.textContent = checkWin(board) + ' won'; 
            newGame = true; 
        }
        else if (checkDraw(board)) {
            turnPara.textContent = 'Draw'; 
            newGame = true; 
        }
    })
})

function checkWin (board) {
    // Check each line of the board 
    if (board[0][0]===board[0][1]&&board[0][1]===board[0][2]) {
        return board[0][0]; 
    }
    else if (board[1][0]===board[1][1]&&board[1][1]===board[1][2]) {
        return board[1][0]; 
    }
    else if (board[2][0]===board[2][1]&&board[2][1]==board[2][2]) {
        return board[2][0]; 
    }
    else if (board[0][0]===board[1][0]&&board[1][0]===board[2][0]) {
        return board[1][0]; 
    }
    else if (board[0][1]===board[1][1]&&board[1][1]===board[2][1]) {
        return board[0][1]; 
    }
    else if (board[0][2]===board[1][2]&&board[1][2]===board[2][2]) {
        return board[0][2]; 
    }
    else if (board[0][0]===board[1][1]&&board[1][1]===board[2][2]) {
        return board[0][0]; 
    }
    else if (board[0][2]===board[1][1]&&board[1][1]===board[2][0]) {
        return board[0][2]; 
    }
    return undefined; 
}

function checkDraw (board) {
    return board.every(row=>row.every(ceil=>ceil!==undefined));
}

function clearBoard () {
    squares.forEach(square=>{
        const p = square.children[0]; 
        p.textContent = ''; 
    }); 
    board.forEach(row=>row.fill(undefined));  
}