const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    let gridItems = document.querySelectorAll('.grid-item');

    const renderBoard = () => {
        board.forEach((element, index) => {
            gridItems[index].textContent = element;
        });
    }

    return {
        board,
        gridItems,
        renderBoard
    };
})();

const Player = (number, mark) => {
    return {
        number,
        mark
    };
};

const player1 = Player('1', 'X');

const player2 = Player('2', 'O');

const gameFlow = (() => {
    let round = 1;
    let player1Turn;
    let player2Turn;

    const playerTurn = () => {
        if (gameFlow.round % 2 !== 0) {
            gameFlow.player1Turn = true;
            gameFlow.player2Turn = false;
        }
        if (gameFlow.round % 2 === 0){
            gameFlow.player1Turn = false;
            gameFlow.player2Turn = true;
        }
    };

    const addMark = () => {
        gameBoard.gridItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (gameBoard.board[index] === '') {
                    playerTurn();
                    if (gameFlow.player1Turn) {
                        gameBoard.board.splice(index, 1, player1.mark);
                        gameBoard.renderBoard();
                    }
                    if (gameFlow.player2Turn) {
                        gameBoard.board.splice(index, 1, player2.mark);
                        gameBoard.renderBoard();
                    }
                    gameFlow.round++;
                }
            })
        })
    };

    return {
        playerTurn,
        addMark,
        round,
        player1Turn,
        player2Turn
    };
})();

gameFlow.addMark();