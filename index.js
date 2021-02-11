const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

const gameBoard = (() => {
    let board = [null, null, null,
                 null, null, null,
                 null, null, null];
    const placeMark = (cell, player) => {
        const index = cell.getAttribute('id');

        if(board[index]) {
            return;
        }

        cell.innerText = player.getMark();
        board[index] = player.getMark();
        Game.setNextPlayer();

        if(getGameStatus() === 'win') {
            setTimeout(function() {
                window.alert(`${player.getMark()} WON!!!`);
            }, 0);
        } else if(getGameStatus() === 'tie') {
            setTimeout(function() {
                window.alert('TIED!');
            }, 0);
        }
    };

    const getGameStatus = () => {
        // evaluate the eight total ways to win
        if(board[0] && board[0] === board[1] && board[1] === board[2]) {
            return 'win';
        } else if(board[3] && board[3] === board[4] && board[4] === board[5]) {
            return 'win';
        } else if(board[6] && board[6] === board[7] && board[7] === board[8]) {
            return 'win';
        } else if(board[0] && board[0] === board[3] && board[3] === board[6]) {
            return 'win';
        } else if(board[1] && board[1] === board[4] && board[4] === board[7]) {
            return 'win';
        } else if(board[2] && board[2] === board[5] && board[5] === board[8]) {
            return 'win';
        } else if(board[0] && board[0] === board[4] && board[4] === board[8]) {
            return 'win';
        } else if(board[2] && board[2] === board[4] && board[4] === board[6]) {
            return 'win';
        }

        return board.every(cell => cell !== null) ? 'tie' : 'active';
    };

    return { placeMark, getGameStatus };
})();

const displayController = (() => {
    //cache DOM
    const board = document.querySelector('#board');
    const cells = board.querySelectorAll('div');

    //bind events
    cells.forEach(cell => cell.addEventListener('click', function() {
        // check whether player 1 or 2 clicked
        // odd number = player 1 -- even number = player 2
        if(Game.getCurrentPlayer() === '1') {
            console.log(this);
            gameBoard.placeMark(this, Game.player1);
        } else {
            console.log(this);
            gameBoard.placeMark(this, Game.player2);
        }
    }));
    
    return { print };
})();

const Game = (() => {
    let turns = 1;
    let player1 = player('Antonio', 'X');
    let player2 = player('Braulio', 'O');

    const setNextPlayer = () => {
        turns++;
    }

    const getCurrentPlayer = () => {
        return turns % 2 ? '1' : '2';
    }

    return { player1, player2, getCurrentPlayer, setNextPlayer };
})();