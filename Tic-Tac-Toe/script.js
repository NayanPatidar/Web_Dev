// It is the map which keeps 
// the data of each cell
let cellData = new Map();

// It initializes the cellData for 
// all the 9 cells 
for (let i = 1; i <= 9; i++) {
  cellData.set(i, '');
}

// It refers to the image which
// will be shown up when hovered 
// or pressed
let currentImage = 'O';

// It is used to show images 
// while hovering
function onHoverFunction(cellNum) {
  let cell = document.getElementById(`cell${cellNum}`);
  if (cellData.get(cellNum) === ''){
  cell.style.opacity = 1;
  cell.style.backgroundImage = hoverImageSelector();
  } 
}

// It is used to remove the images when 
// user exits the hover 
function exitHoverFunction(cellNum) {
  let cell = document.getElementById(`cell${cellNum}`);

  if (cellData.get(cellNum) === ''){
  cell.style.backgroundImage = `none`;
  }
}

// This keeps the check when the cell is 
// clicked. It is executed only when the cell
// is completely empty
function onClickFunction(cellNum){

  if (cellData.get(cellNum) === ''){
    cellData.set(cellNum,'Yes');
    let cell = document.getElementById(`cell${cellNum}`);
    cell.style.backgroundImage = pressImageSelector();
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