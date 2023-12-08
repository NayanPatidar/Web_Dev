
let boxData = new Map();
function updateValue(boxNum){
  
  let presence = (checkKeyPresence(boxNum));
  if (!presence){
    boxData.set(`${boxNum}`, 1);
  } else {
    let va = boxData.get(`${boxNum}`);
    boxData.set(`${boxNum}`, va+1);
  }

  document.querySelector(`.box${boxNum + 1}`).innerText = boxData.get(`${boxNum}`);
}

function checkKeyPresence(boxNum){
  for (let [key, value] of boxData){
    if (`${key}` == boxNum){
      return true;
    }
  }
  return false;
}
