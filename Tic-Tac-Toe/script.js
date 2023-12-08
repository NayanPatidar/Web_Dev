function onHoverFunction(cellNum) {
  console.log(`The cell hovered is ${cellNum}`);
  let cell = document.getElementById(`cell${cellNum}`);
  cell.style.opacity = 1;
  cell.style.backgroundImage = `url('resources/Hover/O_Hover.png')`;;

}

function exitHoverFunction(cellNum) {
  console.log(`The cell hovered is ${cellNum}`);
  let cell = document.getElementById(`cell${cellNum}`);
  setTimeout(() => {
    cell.style.opacity = 0;
  }, 1);
}

function imageSelector() {

}
