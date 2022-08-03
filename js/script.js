const gameBoard = (() => {
    let board = ['X', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'X'];

    let gridContainer = document.querySelector('.grid-container');

    let gridItems = document.querySelectorAll('.grid-item');

    const renderBoard = () => {
        board.forEach((element, index) => {
            gridItems[index].textContent = element;
        });
    }

    return {
        renderBoard
    };
})();

gameBoard.renderBoard();

const Player = () => {
    
};

const gameFlow = (() => {

})();