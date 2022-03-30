let direction = { x: 0, y: 0 };
let snakePosition = [{ x: 1, y: 1 }];
let lastUpdate = 0;
frog = generatePosition();
let speed = 3;
const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }]  // two possible start directions
const up = "ArrowUp";
const down = "ArrowDown";
const left = "ArrowLeft";
const right = "ArrowRight";
scr = 0;
let isUpdated = false;
let previousCommand = '';
let currentCommand = '';


function start(time) {
    window.requestAnimationFrame(start);
    if ((time - lastUpdate) / 1000 < 1 / speed) {
        return;
    }
    lastUpdate = time;

    document.getElementsByClassName('hiscore')[0].innerHTML = 'HiScore: ' + localStorage.getItem('hiscore');
    document.getElementsByClassName('speed')[0].innerHTML = 'Speed: ' + speed;
    document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + scr;

    playGame();
}

window.requestAnimationFrame(start);
window.addEventListener('keydown', event => {

    if (event.key == left) {
        goLeft();
    } else if (event.key == right) {
        goRight();
    } else if (event.key == up) {
        goUp();
    } else if (event.key == down) {
        goDown();
    }
});

function playGame() {
    // speed will increase every 10 scores and stay on same level if a snake dies
    if ((scr > 0) && (scr % 10 == 0) && !isUpdated) {
        speed++;
        document.getElementsByClassName('speed')[0].innerHTML = 'Speed: ' + speed;
        isUpdated = true;
    }
    if (dead(snakePosition)) {
        //place the snake to the beginning and make a new frog, restart the counter, then how alert
        restartGame().then(alert("Game Over!"));
    }

    if (snakePosition[0].y === frog.y && snakePosition[0].x === frog.x) {
        // snake can eat and grow 
        snakePosition.unshift({ x: snakePosition[0].x + direction.x, y: snakePosition[0].y + direction.y });
        // generate a new frog     
        frog = generatePosition();
        scr++;
        isUpdated = false;

        document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + scr;
    }

    for (let i = snakePosition.length - 2; i >= 0; i--) {
        snakePosition[i + 1] = { ...snakePosition[i] };
    }

    snakePosition[0].x += direction.x;
    snakePosition[0].y += direction.y;
    previousCommand = currentCommand;

    //without this the whole game field will eventually be colored into the snake colour
    document.getElementById('grid-container').innerHTML = "";

    addMovingSnake();
    addFrog();
}
function generatePosition() {
    return { x: Math.floor(Math.random() * 24) + 1, y: Math.floor(Math.random() * 24) + 1 };
}
function addFrog() {
    frogItem = document.createElement('div');

    frogItem.style.gridColumnStart = frog.x;
    frogItem.style.gridRowStart = frog.y;

    frogItem.classList.add('frog')
    document.getElementById('grid-container').appendChild(frogItem);
}

function addMovingSnake() {
    snakePosition.forEach((element, index) => {
        snakeItem = document.createElement('div');

        snakeItem.style.gridColumnStart = element.x;
        snakeItem.style.gridRowStart = element.y;

        if (index == 0) {
            snakeItem.classList.add('snakehead');
        }
        else {
            snakeItem.classList.add('snakebody');
        }
        document.getElementById('grid-container').appendChild(snakeItem);
    });
}

function dead(snake) {
    // hit the wall
    if (snake[0].x >= 24 || snake[0].x < 1 || snake[0].y >= 24 || snake[0].y < 1) {
        snakePosition = [{ x: 1, y: 1 }];
        return true;
    }

    // has eaten itself on the same plane
    if (Object.keys(snake).length > 1) {
        if (((currentCommand === 'r') && (previousCommand === 'l')) || ((currentCommand === 'l') && (previousCommand === 'r')) || ((currentCommand === 'u') && (previousCommand === 'd')) || ((currentCommand === 'd') && (previousCommand === 'u'))) {
            snakePosition = [{ x: 1, y: 1 }];
            currentCommand = '';
            previousCommand = '';
            return true;
        }
    }

    // has eaten its body
    for (let i = 1; i < snakePosition.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            snakePosition = [{ x: 1, y: 1 }];
            return true;
        }
    }

    return false;
}

async function restartGame() {
    direction = directions[Math.round(Math.random())];
    // a workaround for the problem of direction not being reassigned and the looping alert behavior as a rasult of it
    if (direction.x === -1 || direction.y === -1) {
        direction.x = 0;
        direction.y = 1;
    }

    frog = generatePosition();
    if (scr > localStorage.getItem('hiscore')) {
        localStorage.setItem('hiscore', scr);
        document.getElementsByClassName('hiscore')[0].innerHTML = 'HiScore: ' + scr;
    }

    scr = 0;
    document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + scr;
}

function goLeft() {
    direction.x = -1;
    direction.y = 0;
    currentCommand = 'l';
}

function goRight() {
    direction.x = 1;
    direction.y = 0;
    currentCommand = 'r';
}

function goUp() {
    direction.x = 0;
    direction.y = -1;
    currentCommand = 'u';
}

function goDown() {
    direction.x = 0;
    direction.y = 1;
    currentCommand = 'd';
}