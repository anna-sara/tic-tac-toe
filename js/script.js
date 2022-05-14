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