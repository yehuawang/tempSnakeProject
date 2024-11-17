const dictionary = [
    "apple", "arrow", "awake", "blaze", "block", "brave", "bring", "broad", "claim", "climb",
    "close", "cover", "dance", "depth", "dream", "eager", "earth", "faith", "fight", "flame",
    "focus", "force", "grace", "great", "happy", "heart", "house", "human", "jolly", "layer",
    "learn", "light", "lucky", "magic", "match", "mover", "never", "other", "paint", "place",
    "plane", "proud", "reach", "ready", "scale", "sense", "serve", "shine", "skill", "smart",
    "smile", "solid", "sound", "space", "stand", "steal", "style", "sweet", "table", "taste",
    "teach", "thank", "think", "total", "tough", "trust", "unity", "vivid", "waste", "watch",
    "where", "whirl", "wider", "world", "write"
];

const gameState = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(5).fill().map(() => Array(5).fill('')),
    currentColPosition: 0,
    currentRowPosition: 0,
};

function updateGrid() {
    for (let i = 0; i < gameState.grid.length; i++) {
        for (let j = 0; j < gameState.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = gameState.grid[i][j];
        }
    }
}

function createBox(container, row, col) {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    container.appendChild(box);
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
            deleteLetter();
        }

        if (key === 'Enter') {
            if (gameState.currentColPosition === 5) {
                const word = getCurrentWord();
                if (isWordInDictionary(word)) {
                    revealWord(word);
                    gameState.currentRowPosition++;
                    gameState.currentColPosition = 0;
                } else {
                    alert("This is not a word.");
                }
            }
        }

        if (isLetterKey(key)) {
            insertLetter(key);
        }

        updateGrid();
    };
}

function getCurrentWord() {
    return gameState.grid[gameState.currentRowPosition].reduce((prev, curr) => prev + curr);
}

function revealWord(guess) {
    const row = gameState.currentRowPosition;
    const animationDuration = 400;
    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === gameState.secret[i]) {
                box.classList.add('right-placement');
            } else if (gameState.secret.includes(letter)) {
                box.classList.add('wrong-placement');
            } else {
                box.classList.add('wrong-empty');
            }
        }, (i * animationDuration) / 2);

        box.classList.add('animated');
    }

    const hasWon = gameState.secret === guess;
    const isGameOver = gameState.currentRowPosition === 5;

    setTimeout(() => {
        if (hasWon) {
            alert('Congratulations!');
        } else if (isGameOver) {
            alert(`Try again! The word was ${gameState.secret}.`);
        }
    }, 3 * animationDuration);
}

function isLetterKey(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function insertLetter(letter) {
    if (gameState.currentColPosition < 5) {
        gameState.grid[gameState.currentRowPosition][gameState.currentColPosition] = letter;
        gameState.currentColPosition++;
    }
}

function deleteLetter() {
    if (gameState.currentColPosition > 0) {
        gameState.currentColPosition--;
        gameState.grid[gameState.currentRowPosition][gameState.currentColPosition] = '';
    }
}

function isWordInDictionary(word) {
    return dictionary.includes(word);
}

function initializeGame() {
    const game = document.getElementById('game');
    createGrid(game);
    storeKeyboardActions();
}

initializeGame();
