const dictionary = ['plane', 'happy', 'audio', 'house'];

const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(5).fill().map(() => Array(5).fill('')),
    currentColPosition: 0,
    currentRowPosition: 0,
};

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function createBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    container.appendChild(box);
    return box;
}

function createGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            createBox(grid, i, j);
        }
    }
    container.appendChild(grid);
}

function storeKeyboardActions() {
    document.body.onkeydown = (e) => {
        const key = e.key;

        if (key === 'Backspace') {
            removeLetter();
        }

        if (key === 'Enter') {
            if (state.currentColPosition === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRowPosition++;
                    state.currentColPosition = 0;
                } else {
                    alert("This is not a word.");
                }
            }
        }

        if (isALetter(key)) {
            addLetter(key);
        }

        updateGrid();
    };
}

function getCurrentWord() {
    return state.grid[state.currentRowPosition].reduce((prev, curr) => prev + curr);
}

function revealWord(guess) {
    const row = state.currentRowPosition;
    const animationDuration = 400;
    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === state.secret[i]) {
                box.classList.add('right-placement');
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong-placement');
            } else {
                box.classList.add('wrong-empty');
            }
        }, (i * animationDuration) / 2);

        box.classList.add('animated');
    }

    const isWinner = state.secret === guess;
    const isGameOver = state.currentRowPosition === 5;

    setTimeout(() => {
        if (isWinner) {
            alert('Congratulations!');
        } else if (isGameOver) {
            alert(`Try again! The word was ${state.secret}.`);
        }
    }, 3 * animationDuration);
}

function isALetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentColPosition === 5) return;
    state.grid[state.currentRowPosition][state.currentColPosition] = letter;
    state.currentColPosition++;
}

function removeLetter() {
    if (state.currentColPosition === 0) return;
    state.grid[state.currentRowPosition][state.currentColPosition - 1] = '';
    state.currentColPosition--;
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function startup() {
    const game = document.getElementById('game');
    createGrid(game);
    storeKeyboardActions();
}

startup();
