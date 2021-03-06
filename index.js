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
        displayController.animate(mark);

        board[index] = player.getMark();
        
        Game.setNextPlayer();

        if(getGameStatus() === 'win') {
            setTimeout(function() {
                displayController.result.classList.remove('hidden');
                displayController.result.classList.add('result');
                displayController.winner.textContent = player.getName() + ' won!';
            }, 500);
        } else if(getGameStatus() === 'tie') {
            setTimeout(function() {
                displayController.result.classList.remove('hidden');
                displayController.result.classList.add('result');
                displayController.winner.textContent = 'Tied';
            }, 500);
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

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    }

    return { reset, placeMark, getGameStatus };
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
    
    const reset = () => {
        turns = 1;
    }

    return { player1, player2, getCurrentPlayer, setNextPlayer, reset };
})();

const displayController = (() => {
    //cache DOM
    const container = document.querySelector('#container');
    const board = container.querySelector('#board');
    const cells = board.querySelectorAll('div');
    const result = container.querySelector('#result');
    const winner = container.querySelector('#winner');
    const newGame = container.querySelector('#newGame');

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

    newGame.addEventListener('click', function() {
        reset();
        gameBoard.reset();
        Game.reset();
        result.classList.add('hidden');
        result.classList.remove('result');
    });

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
        path1.setAttributeNS(null, 'class', 'path');

        path2.setAttributeNS(null, 'style', 'fill:none;stroke:#000000;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1');
        path2.setAttributeNS(null, 'd', 'm 86.073263,103.96267 c 0,0 11.14405,6.03116 18.174327,19.24342 10.44388,19.62757 26.72696,40.09042 26.72696,40.09042 0,0 3.20723,5.87993 8.55262,7.48354');
        path2.setAttributeNS(null, 'class', 'path');

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
        path.setAttributeNS(null, 'class', 'path');

        g.appendChild(path);
        svg.appendChild(g);

        return svg;
    }

    const animate = (mark) => {
        var paths = mark.querySelectorAll('.path');
        paths.forEach(path => {
            var length = path.getTotalLength();
            // Clear any previous transition
            path.style.transition = path.style.WebkitTransition = 'none';
            // Set up the starting positions
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            // Define our transition
            path.style.transition = path.style.WebkitTransition =
                'stroke-dashoffset 500ms ease-out';
            // Go!
            path.style.strokeDashoffset = '0';
        });
    }

    const reset = () => {
        cells.forEach(cell => {
            if(cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        });
    }
    
    return { winner, result, createSVG, animate };
})();