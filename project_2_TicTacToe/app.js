function player(name, turn, char) {
    const isTurn = turn;
    const turnChar = 'X';

    return {name, isTurn};
}

function init() {
    let player1 = player("Player 1", true, 'X');
    let player2 = player("Player 2", false, "O");
    var turnCount = 0;
    
    gameBoard.renderBoard(turnCount, player1, player2);
}


const gameBoard = (() => {

    let board = [
        "", "", "", 
        "", "", "", 
        "", "", ""
    ];

    const renderBoard = (turnCount, player1, player2) => {

        check.checkWinner(board);

        const boardDIV = document.querySelector('.board-container');
        boardDIV.innerHTML = "";
        board.map( (space, index) => {
            // create a space for board
            const square = document.createElement('div');
            square.dataset.index = index;
            square.classList.add("square");
            // create text element for X & O
            const char = document.createElement('h2');
            char.innerText = `${space}`;
            // append elements
            square.appendChild(char);
            boardDIV.appendChild(square);
        });

        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');

                let mark = turnCount % 2 === 0 ? 'X' : 'O';
                console.log(player1);

                if(board[index] == "") {
                    putTurn(index, mark);

                    turnCount++;
                }  
            })
        })

    };

    const putTurn = (index, mark) => {
        board[index] = mark;
        renderBoard();
    }

    return { renderBoard };
})();

const check = (() => {
    function checkTurn(turnCount, player1, player2) {
        if(turnCount % 2 === 0) {
            player1.isTurn = true;
            player2.isTurn = false;

        }
        else if  (turnCount % 1 === 0) {
            player2.isTurn = true;
            player1.isTurn = false;
        }
    }

    function checkWinner(board){
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== "") {
            console.log("winner!");
        }
        else if (board[3] === board[4] && board[4] === board[5] && board[3] !== "") {
            console.log("winner!");
        }
        else if  (board[6] === board[7] && board[7] === board[8] && board[6] !== "") {
            console.log("winner!");
        }
        else if  (board[0] === board[3] && board[3] === board[6] && board[0] !== "") {
            console.log("winner!");
        }
        else if  (board[1] === board[4] && board[4] === board[7] && board[1] !== "") {
            console.log("winner!");
        }
        else if  (board[2] === board[5] && board[3] === board[7] && board[2] !== "") {
            console.log("winner!");
        }
        else if  (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
            console.log("winner!");
        }
        else if  (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
            console.log("winner!");
        }
    }

    return { checkTurn, checkWinner };
})();



init();