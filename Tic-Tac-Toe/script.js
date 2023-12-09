// It is the map which keeps 
// the data of each cell
let cellData = new Map();

// It initializes the cellData for 
// all the 9 cells 
for (let i = 1; i <= 9; i++) {
  cellData.set(i, ['', '']);
}

// It refers to the image which
// will be shown up when hovered 
// or pressed
let currentImage = 'O';

//To keep a check if winner has been found
let winnerFound = false;

// It is used to show images 
// while hovering
function onHoverFunction(cellNum) {
  if (!winnerFound){
  let cell = document.getElementById(`cell${cellNum}`);
  let cellValues = cellData.get(cellNum);
  if (cellValues[0] === ''){
  cell.style.opacity = 1;
  cell.style.backgroundImage = hoverImageSelector();
  }
  } 
}

// It is used to remove the images when 
// user exits the hover 
function exitHoverFunction(cellNum) {
  if (!winnerFound){
  let cell = document.getElementById(`cell${cellNum}`);
  let cellValues = cellData.get(cellNum);
  if (cellValues[0] === ''){
  cell.style.backgroundImage = `none`;
  }
  }
}

// This keeps the check when the cell is 
// clicked. It is executed only when the cell
// is completely empty
function onClickFunction(cellNum){
  if (!winnerFound && cellData.get(cellNum)[0] === ''){
    cellData.set(cellNum,['Yes', `${currentImage}`]);
    let cell = document.getElementById(`cell${cellNum}`);
    cell.style.backgroundImage = pressImageSelector();

    checkWinner();

    characterInvert();
  }
}

// This is to return the address of the image 
// which has to added when is is hovered 
function hoverImageSelector() {
  if (currentImage === 'O'){
    return `url('resources/Hover/O_Hover.png')`;
  } else if (currentImage === 'X') {
    return `url('resources/Hover/X_Hover.png')`;
  }
}

// This is to return the addres of the image 
// which has to be put wwhen clicked
function pressImageSelector() {
  if (currentImage === 'O'){
    return `url('resources/O.png')`;
  } else if (currentImage === 'X') {
    return `url('resources/X.png')`;
  }
}


// THis is to invert the character after it has
// been pressed
function characterInvert(){
  if (currentImage === 'X'){
    currentImage = 'O';
  } else if ( currentImage === 'O'){
    currentImage = 'X';
  }
}

function checkWinner(){
  cellData.forEach((value, key) => {
    let [value1, value2] = value;
    console.log(`${key} : ${value1} - ${value2}`);
  });

  if ((cellData.get(1)[1] === 'O' && cellData.get(2)[1] === 'O' && cellData.get(3)[1] === 'O') ||
      (cellData.get(1)[1] === 'X' && cellData.get(2)[1] === 'X' && cellData.get(3)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
  } 
  else if ((cellData.get(4)[1] === 'O' && cellData.get(5)[1] === 'O' && cellData.get(6)[1] === 'O') ||
           (cellData.get(4)[1] === 'X' && cellData.get(5)[1] === 'X' && cellData.get(6)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
  } else if ((cellData.get(7)[1] === 'O' && cellData.get(8)[1] === 'O' && cellData.get(9)[1] === 'O') ||
             (cellData.get(7)[1] === 'X' && cellData.get(8)[1] === 'X' && cellData.get(9)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
  } else if ((cellData.get(1)[1] === 'O' && cellData.get(4)[1] === 'O' && cellData.get(7)[1] === 'O') ||
             (cellData.get(1)[1] === 'X' && cellData.get(4)[1] === 'X' && cellData.get(7)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
  } 
  else if ((cellData.get(2)[1] === 'O' && cellData.get(5)[1] === 'O' && cellData.get(8)[1] === 'O') ||
           (cellData.get(2)[1] === 'X' && cellData.get(5)[1] === 'X' && cellData.get(8)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
  } else if ((cellData.get(3)[1] === 'O' && cellData.get(6)[1] === 'O' && cellData.get(9)[1] === 'O') ||
             (cellData.get(3)[1] === 'X' && cellData.get(6)[1] === 'X' && cellData.get(9)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
  } else if ((cellData.get(1)[1] === 'O' && cellData.get(5)[1] === 'O' && cellData.get(9)[1] === 'O') ||
             (cellData.get(1)[1] === 'X' && cellData.get(5)[1] === 'X' && cellData.get(9)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
} else if ((cellData.get(3)[1] === 'O' && cellData.get(5)[1] === 'O' && cellData.get(7)[1] === 'O') ||
           (cellData.get(3)[1] === 'X' && cellData.get(5)[1] === 'X' && cellData.get(7)[1] === 'X')){
        console.log(`Winner is ${currentImage}`);
        winnerFound = true;
} 

if (winnerFound){
  printWinner();
} else {
  tieCheck();
}
}

function printWinner(){
  let winnerSpan = document.getElementById('GameStatus');
  winnerSpan.innerText = `${currentImage} -  WON THE GAME !!`; 
}

function printTie(){
  
}

function tieCheck(){
  let blankPresent = false;
    for (let i = 1; i <= 9; i++) {
      if (cellData.get(i)[1] === ''){
        blankPresent = true;
      } 
  }
  if (!blankPresent){
    printTie();
  }
}

function restartGame(){
  winnerFound = false;
  for (let i = 1; i <= 9; i++) {
    cellData.set(i, ['', '']);
    let cell = document.getElementById(`cell${i}`);
    cell.style.backgroundImage = 'none';
  }
  let winnerSpan = document.getElementById('GameStatus');
  winnerSpan.innerText = ``;
}