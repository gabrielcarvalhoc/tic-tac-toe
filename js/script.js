const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    let gridItems = document.querySelectorAll('.grid-item');

    const renderBoard = () => {
        board.forEach((element, index) => {
            gridItems[index].textContent = element;
        });
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }

        renderBoard();
    }

    return {
        board,
        gridItems,
        renderBoard,
        reset
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

const game = (() => {
    let round = 1;
    let player1Turn;
    let player2Turn;
    let winner = '';
    let gameOver = false;

    const playerTurn = () => {
        if (round % 2 !== 0) {
            player1Turn = true;
            player2Turn = false;
            displayController.showPlayer2Turn();
        }

        if (round % 2 === 0){
            player1Turn = false;
            player2Turn = true;
            displayController.showPlayer1Turn();
        }
    };

    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        winConditions.forEach((winCondition) => {
            let a = gameBoard.board[winCondition[0]];
            let b = gameBoard.board[winCondition[1]];
            let c = gameBoard.board[winCondition[2]];

            if (a === player1.mark && a === b && b === c) {
                game.winner = player1.number;
                gameOver = true;
                displayController.showWinner();
            }

            if (a === player2.mark && a === b && b === c) {
                game.winner = player2.number;
                displayController.showWinner();
                gameOver = true;
            }
        })

        if (round === 10 && game.winner === '') {
            displayController.showTie();
        }
    };

    const playRound = () => {
        gameBoard.gridItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (gameOver === false) {
                    if (gameBoard.board[index] === '') {
                        playerTurn();
    
                        if (player1Turn) {
                            gameBoard.board.splice(index, 1, player1.mark);
                            gameBoard.renderBoard();
                        }
    
                        if (player2Turn) {
                            gameBoard.board.splice(index, 1, player2.mark);
                            gameBoard.renderBoard();
                        }

                        round++;
                    }

                    checkWinner();
                }
            })
        })
    };

    const reset = () => {
        round = 1;
        game.winner = '';
        gameOver = false;
    }

    return {
        playRound,
        reset,
        winner
    };
})();

const displayController = (() => {
    let message = document.querySelector('.message');

    const restart = () => {
        let restartButton = document.querySelector('.restart-button');

        restartButton.addEventListener('click', () => {
            game.reset();
            gameBoard.reset();
            showPlayer1Turn();
        })
    }

    const showPlayer1Turn = () => {
        message.textContent = `Player ${player1.number}\'s turn`;
    }
    
    const showPlayer2Turn = () => {
        message.textContent = `Player ${player2.number}\'s turn`;
    }

    const showWinner = () => {
        message.textContent = `Player ${game.winner} wins!`
    }

    const showTie = () => {
        message.textContent = `It\'s a tie!`
    }

    return {
        restart,
        showPlayer1Turn,
        showPlayer2Turn,
        showWinner,
        showTie
    }
})();

game.playRound();
displayController.restart();
displayController.showPlayer1Turn();