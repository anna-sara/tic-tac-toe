'use strict'

const gameBoard = (() => {

    const board = ["","","","","","","","",""];
    const gameboardContainer = document.querySelector('.gameboard-container');
    const player1Turn = document.querySelector('.player1');
    const player2Turn = document.querySelector('.player2');
    let winnerText = document.querySelector('.winner');

    const layOutGameBoard = () => {
        for(let i = 0; i < board.length; i++) {
        let cell = document.createElement('div');
        cell.textContent = board[i];
        cell.classList = 'cell';
        cell.setAttribute('id', [i]);
        gameboardContainer.appendChild(cell);
        }
    };

    player1Turn.style.borderBottom = '';
    player2Turn.style.borderBottom = '';
    
    return {board, layOutGameBoard, player1Turn, player2Turn, winnerText};
})(); 

const playerFactory = (name, symbol) => {
    return {name, symbol};
};

const startGame = (() => {
    
    gameBoard.layOutGameBoard();
    const board = gameBoard.board;
    const player1 = playerFactory('You', 'X');
    const player2 = playerFactory('Computer' , 'O');
    let currentPlayer = player1;
    let cells = document.querySelectorAll('.cell');
    let winnerText = gameBoard.winnerText;
    let gameOver = true;
    
    
    let newGameAginstFriendBtn = document.querySelector('.againstFriendBtn');
    newGameAginstFriendBtn.addEventListener('click', startGame);

    function startGame(e) {
        gameOver = true;
        const playAgainstFriendForm = document.querySelector('.playAgainstFriendForm');

        playAgainstFriendForm.style.display = 'flex';

        let startBtn = document.querySelector('.startGameFriendBtn');
        startBtn.addEventListener('click', getPlayersName);
       
        function getPlayersName(e) {

                let name2 = e.target.previousElementSibling;
                name2.value === "" ? player2.name = 'Player 2': player2.name = name2.value;
                gameBoard.player2Turn.textContent = `${ player2.symbol} ${player2.name}`;

                let name1 = name2.previousElementSibling;
                name1.value === "" ? player1.name = 'Player 1': player1.name = name1.value;
                gameBoard.player1Turn.textContent = `${ player1.symbol} ${player1.name}`

                gameBoard.player1Turn.style.borderBottom = '3px solid #fb9f8b';

                playAgainstFriendForm.style.display = 'none';
                
                restart();   
                playGame();
        }
    }

    function restart() {
        board.fill('');

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = '';
            cell.style.fontWeight = '200'
        })

        gameBoard.player2Turn.style.borderBottom = 'none';
        winnerText.textContent = "";
        currentPlayer = player1;
    }
    
    return {gameOver,player1, player2, currentPlayer};
})(); 

const playGame = () => {
    
    const board = gameBoard.board;
    const player1 = startGame.player1;
    const player2 = startGame.player2;
    let currentPlayer = startGame.currentPlayer;
    let gameOver = startGame.gameOver;
    gameOver = false;
    

    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', targetCell));

    
};
