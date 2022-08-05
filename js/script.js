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
        }

        if (round % 2 === 0){
            player1Turn = false;
            player2Turn = true;
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
                winner = player1.number;
                console.log(`Player ${winner} wins`);
                gameOver = true;
            }

            if (a === player2.mark && a === b && b === c) {
                winner = player2.number;
                console.log(`Player ${winner} wins`);
                gameOver = true;
            }
        })

        if (round === 10 && winner === '') {
            console.log('It\'s a tie');
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
        winner = '';
        gameOver = false;
    }

    return {
        playRound,
        reset
    };
})();

const displayController = (() => {
    const restart = () => {
        let restartButton = document.querySelector('.restart-button');

        restartButton.addEventListener('click', () => {
            game.reset();
            gameBoard.reset();
        })
    }

    return {
        restart
    }
})();

game.playRound();
displayController.restart();