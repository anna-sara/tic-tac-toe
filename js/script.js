'use strict'

/*Generate the gameboard.*/
const gameBoard = (() => {

    //The array that keeps track over the gameBoard
    const gameBoardArray = [null,null,null,null,null,null,null,null,null];
    // Find elements and save them in varibles
    const gameboardContainer = document.querySelector('.gameboard-container');
    const player1Turn = document.querySelector('.player1');
    const player2Turn = document.querySelector('.player2');
    let winnerText = document.querySelector('.winner');

    /* Creates a grid with cells. Amount of cells is based on the 
    length of the gameBoardArray. */
    const layOutGameBoard = () => {
        for(let i = 0; i < gameBoardArray.length; i++) {
        let cell = document.createElement('div');
        cell.textContent = gameBoardArray[i];
        cell.classList = 'cell';
        cell.setAttribute('id', [i]);
        gameboardContainer.appendChild(cell);
        }
    };

    player1Turn.style.borderBottom = '';
    player2Turn.style.borderBottom = '';
    
    return {gameBoardArray, layOutGameBoard, player1Turn, player2Turn, winnerText};
})(); 

/*Factory function that generates player objects */
const playerFactory = (name, symbol) => {
    return {name, symbol};
};

/* Set up the game */
const startGame = (() => {
    //Generate the gameboard grid
    gameBoard.layOutGameBoard();

    // Create varibles of gameBoardArray, the gameboard cells and the winnerText
    const gameBoardArray = gameBoard.gameBoardArray;
    let cells = document.querySelectorAll('.cell');
    let winnerText = gameBoard.winnerText;

    // Make two players with the default names of Player 1 and Player 2
    const player1 = playerFactory('Player 1', 'X');
    const player2 = playerFactory('Player 2' , 'O');
    // Set current player tp player1
    let currentPlayer = player1;
    // Flag to keep track if the game is over ot not and if the cells on gameBoard should be clickable
    let gameOver = true;
    
    // Set eventlistener on btn .againstFriendBtn
    let newGameAginstFriendBtn = document.querySelector('.againstFriendBtn');
    newGameAginstFriendBtn.addEventListener('click', chooseName);

    // Players can add names. If no names is choosen the default name of Player 1 and Player 2 will be used.
    function chooseName(e) {
        gameOver = true;

        // Form to fill out names
        const playAgainstFriendForm = document.querySelector('.playAgainstFriendForm');

        playAgainstFriendForm.style.display = 'flex';

        // Set eventlistener on start btn
        let startBtn = document.querySelector('.startGameFriendBtn');
        startBtn.addEventListener('click', getPlayersName);
        // Get the names from the form .Set the choosen names or the default names on the gameboard,
        function getPlayersName(e) {

                let name2 = e.target.previousElementSibling;
                name2.value === "" ? player2.name = 'Player 2': player2.name = name2.value;
                gameBoard.player2Turn.textContent = `${ player2.symbol} ${player2.name}`;

                let name1 = name2.previousElementSibling;
                name1.value === "" ? player1.name = 'Player 1': player1.name = name1.value;
                gameBoard.player1Turn.textContent = `${ player1.symbol} ${player1.name}`

                gameBoard.player1Turn.style.borderBottom = '3px solid #fb9f8b';

                playAgainstFriendForm.style.display = 'none';
        }
        // Empty the gameboard/cells/array
        restart(); 
        playGame();
    }

    // Empty the gameboard/cells/array  and set current player to player1
    function restart() {
        gameBoardArray.fill(null);

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

// Play the game. Targets cell and print the players symbol. Checks if there is a winner.
const playGame = () => {
    
    // Create varibles of gameBoardArray, players, currentPlayer and gameOver
    const gameBoardArray = gameBoard.gameBoardArray;
    const player1 = startGame.player1;
    const player2 = startGame.player2;
    let currentPlayer = startGame.currentPlayer;
    let gameOver = startGame.gameOver;
    // Set gameover to false so cells can be clickable
    gameOver = false;  
    
    // Find all cells and add eventlistener that will target clicked cell
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', targetCell));

    // Checks if target cell is empty and adds players symbol. Checks for winner of tie.
    function targetCell(e) {
        const cell= e.target;
        if(gameOver == false) {
            /* If target cell is empty in gameboardArray  
            the current players symbol will be added to the gameBoardArray and the cell*/
            if(!gameBoardArray[cell.id]) {
                gameBoardArray[cell.id] = currentPlayer.symbol;
                cell.textContent = currentPlayer.symbol

                // Checks if there is a winner. If there is, a winner isannounced and gameOver is set to true.
                if(playerHasWon() !== false ){
                    gameBoard.winnerText.textContent = `${currentPlayer.name} has won`;
                    let winningCells = playerHasWon();
                    winningCells.map(cell => cells[cell].style.color = '#fb9f8b');
                    winningCells.map(cell => cells[cell].style.fontWeight = '400');
                    gameOver = true;
                }
                //Checks if there is a tie. If there is, the tie is announced and gameOver is set to true.
                if(gameBoardArray.every(cell => cell !== null) && playerHasWon() === false ) { 
                    gameBoard.winnerText.textContent = `It's a tie!`;
                    gameOver = true;
                } 
        
                // currentPlayer is changed
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
    //Checks if there is a winner
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
