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

    function targetCell(e) {
        const cell= e.target;

        if(gameOver == false) {
            if(!board[cell.id]) {
                board[cell.id] = currentPlayer.symbol;
                cell.textContent = currentPlayer.symbol
            
                if(board.every(cell => cell !== "") && playerHasWon() == false ) { 
                    gameBoard.winnerText.textContent = `It's a tie!`;
                    gameOver = true;
        
                }
        
                if(playerHasWon() !== false ){
                    gameBoard.winnerText.textContent = `${currentPlayer.name} has won`;
                    let winningCells = playerHasWon();
                    console.log(winningCells);
                    winningCells.map(cell => cells[cell].style.color = '#fb9f8b');
                    winningCells.map(cell => cells[cell].style.fontWeight = '400');
                    gameOver = true;
                }

                currentPlayer = currentPlayer == player1 ? player2 : player1; 

                if (currentPlayer == player1 ) {
                    gameBoard.player2Turn.style.borderBottom = 'none',
                    gameBoard.player1Turn.style.borderBottom = '3px solid #fb9f8b'; 
                } else {
                    gameBoard.player1Turn.style.borderBottom = 'none',
                    gameBoard.player2Turn.style.borderBottom = '3px solid #fb9f8b'; 
                }
                           
            }
        } 
        
    }
    function playerHasWon() {

        const winningsCombos = [
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ]

        for (const combo of winningsCombos) {
            let [a,b,c] = combo;

            if(cells[a].textContent && cells[a].textContent == cells[b].textContent && cells[a].textContent == cells[c].textContent){
                console.log([a,b,c]);
                return [a,b,c];     
            }
        }
        return false;
    }

    
};
