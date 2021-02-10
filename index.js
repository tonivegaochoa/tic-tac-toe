const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

const gameBoard = (() => {
    let board = [null, null, null,
                 null, null, null,
                 null, null, null,];
    const placeMark = (cell, player) => {
        let index = cell.getAttribute('id');
        cell.innerText = player.getMark();
        board[index] = player.getMark();
    };

    const getGameStatus = () => {
        // evaluate the eight total ways to win
    };

    return { placeMark, getGameStatus };
})();

const displayController = (() => {
    //cache DOM
    const container = document.querySelector('#container');
    const cells = container.querySelectorAll('td');

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

    const getCurrentPlayer = () => {
        return ++turns % 2 ? '1' : '2';
    }

    return { player1, player2, getCurrentPlayer };
})();