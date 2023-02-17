
const state = {
  secret: '',
  hint : '',
  grid: Array(4)
    .fill()
    .map(() => Array(4).fill('')),
  currentRow: 0,
  currentCol: 0,
};
const myButton = document.getElementById('start_over');

var guessword = {
  word: "",
  hint: "",}; 

  const list = async () => {
    myButton.disabled = true;
    myButton.innerText = 'Loading...';
    document.body.style.cursor = 'wait';

  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
      headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
      },
  });

  let json = await res.json();
  let {dictionary} = json;


  guessword = dictionary[Math.floor(Math.random() * dictionary.length)];
  guessword.word = guessword.word.toUpperCase();
  guessword.hint = guessword.hint;
  myButton.disabled = false;
  myButton.innerText = 'Start over';
  document.body.style.cursor = 'default';

  return guessword.word;
  }

list().then((data) => {
  state.secret = data;
  state.hint = guessword.hint;
  console.log(state.secret);

});








const gameInstructionsBtn = document.getElementById("Game_Instructions");
gameInstructionsBtn.addEventListener("click", () => {
  var gameInstructions = document.getElementById("info");
  if (gameInstructions.style.display === "flex") {
    gameInstructions.style.display = "none";
  } 
  else {
    gameInstructions.style.display = "flex";
  }

});


const Hint_icon = document.getElementById("Hint_icon");
Hint_icon.addEventListener("click", () => {
  var show = document.getElementById("hint");
  show.innerHTML = state.hint;
  if (show.style.display === "block") {
    show.style.display = "none";
  } 
  else {
    show.style.display = "block";
  }

});



const button = document.getElementById('Dark_Mode');
const body = document.body;
const html = document.documentElement;
const navbar = document.querySelector('.navbar');
const buttons = document.querySelectorAll(".navbar .buttons button");
const darkModeButton = document.getElementById('Dark_Mode');

button.addEventListener('click', () => {
  body.classList.toggle('dark');
  html.classList.toggle('dark');
  navbar.classList.toggle('dark');
  buttons. classList.toggle('dark');
  footer.classList.toggle('dark');

});

darkModeButton.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
});

const Game_Instructions = document.getElementById('footer');
const click = document.getElementById('Game_Instructions');
click.addEventListener('click', () => {
  Game_Instructions.classList.toggle('hidden');
});

function drawGrid(container) {
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = letter;
  box.id = `box${row}${col}`;
  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    let key = e.key;
    key = key.toUpperCase();
    if (key === 'ENTER') {
      if (state.currentRow == 4){
        var show = document.getElementById("hint");
        document.hint.style.backgroundColor = "red";
        show.innerHTML = 'you missed the word ' + state.secret + ' and lost!';
      }
      if (state.currentCol < 4) {
        alert('word must be 4 letters')
      }
      else{
        const word = getCurrentWord();
        // if (isWordValid(word)) {
        //   revealWord(word);
        //   state.currentRow++;
        //   state.currentCol = 0;
        // } else 
        
          revealWord(word);
          state.currentRow++;
          state.currentCol = 0;
        
      }
    }
    if (key === 'BACKSPACE') {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }
    if (state.currentRow == 4){
      alert(`Better luck next time! The word was ${state.secret}.`);
    }
    updateGrid();
  };
}



function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

// function isWordValid(word) {
//   return dictionary.includes(word);
// }

function getNumOfOccurrencesInWord(word, letter) {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function getPositionOfOccurrence(word, letter, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function revealWord(guess) {
  const row = state.currentRow;

  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;


    
 {
        if (letter === state.secret[i]) {
          box.classList.add('right');
        } else if (state.secret.includes(letter)) {
          box.classList.add('wrong');
        } else {
          box.classList.add('empty');
        }
      }
  }

  const isWinner = state.secret === guess;

  

    if (isWinner) {
      const winnerGif = document.createElement('img');
      var show = document.getElementById("hint");
      show.style.display = "none";
      winnerGif.style.display = 'block';
      winnerGif.style.margin = '0 auto';
      winnerGif.src = './assets/congrats.gif';
      const game = document.getElementById('game');
      game.parentNode.replaceChild(winnerGif, game);

    } 
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 4) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}



function startup() {
  const game = document.getElementById('game');
  drawGrid(game);

  registerKeyboardEvents();
}

startup();