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

        const mark = displayController.createSVG(player.getMark());
        cell.appendChild(mark);
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
            gameBoard.placeMark(this, Game.player1);
        } else {
            gameBoard.placeMark(this, Game.player2);
        }
    }));

    const createSVG = (mark) => {
        return mark === 'X' ? createXSVG() : createOSVG();
    }

    const createXSVG = () => {
        const xmlns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(xmlns, 'svg');
        const g = document.createElementNS(xmlns, 'g');
        const path1 = document.createElementNS(xmlns, 'path');
        const path2 = document.createElementNS(xmlns, 'path');

        svg.setAttributeNS(null, 'width', '59.604538mm');
        svg.setAttributeNS(null, 'height', '71.624359mm');
        svg.setAttributeNS(null, 'viewBox', '0 0 59.604538 71.624359');
        svg.setAttributeNS(null, 'version', '1.1');

        g.setAttributeNS(null, 'transform', 'translate(-81.922631,-101.96267)');
        path1.setAttributeNS(null, 'style', 'fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1');
        path1.setAttributeNS(null, 'd', 'm 137.37654,104.76965 c 0,0 -11.14405,6.03116 -18.17433,19.24342 -10.44388,19.62757 -26.726955,40.09042 -26.726955,40.09042 0,0 -3.207234,5.87993 -8.552624,7.48354');
        path1.setAttributeNS(null, 'id', 'x1');

        path2.setAttributeNS(null, 'style', 'fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1');
        path2.setAttributeNS(null, 'd', 'm 86.073263,103.96267 c 0,0 11.14405,6.03116 18.174327,19.24342 10.44388,19.62757 26.72696,40.09042 26.72696,40.09042 0,0 3.20723,5.87993 8.55262,7.48354');
        path2.setAttributeNS(null, 'id', 'x2');

        g.appendChild(path1);
        g.appendChild(path2);
        svg.appendChild(g);
        
        return svg;
    };

    const createOSVG = () => {
        const xmlns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(xmlns, 'svg');
        const g = document.createElementNS(xmlns, 'g');
        const path = document.createElementNS(xmlns, 'path');

        svg.setAttributeNS(null, 'width', '75.280403mm');
        svg.setAttributeNS(null, 'height', '69.772499mm');
        svg.setAttributeNS(null, 'viewBox', '0 0 75.280403 69.772499');
        svg.setAttributeNS(null, 'version', '1.1');

        g.setAttributeNS(null, 'transform', 'translate(-64.302924,-93.245361)');
        path.setAttributeNS(null, 'style', 'fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1');
        path.setAttributeNS(null, 'd', 'm 102.80952,95.249999 c 0,0 -30.994045,3.023809 -35.52976,24.190471 -4.535712,21.16667 6.803572,41.57739 32.505954,41.57739 25.702376,0 37.797616,-26.45834 37.797616,-34.01786 0,-7.55953 -3.02381,-30.238095 -34.77381,-31.750001 z');
        path.setAttributeNS(null, 'id', 'o');

        g.appendChild(path);
        svg.appendChild(g);

        return svg;
    }
    
    return { print, createSVG };
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