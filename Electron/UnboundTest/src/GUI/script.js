const { ipcRenderer } = require('electron');

let buttons = document.querySelectorAll('.features ul li input[type="radio"]');
buttons.forEach((button)=> {
    button.addEventListener('change', function(){
    
        let AlllistItems = document.querySelectorAll('.features ul li');
        AlllistItems.forEach((listItem) => {
            listItem.style.backgroundColor = '#fff'; 
            listItem.style.color = '#000'
        });
        let listItem = button.closest('li');
    
        if (button.checked) {
            listItem.style.backgroundColor  = '#32394A';
            listItem.style.color = '#fff'
        } else {
            console.log("Here in else");
            listItem.style.backgroundColor  = '#fff';
        }
    })  
    
})

document.addEventListener('DOMContentLoaded', function () {
    const minimizeButton = document.getElementById('minimize-btn');
    const closeButton = document.getElementById('close-btn');

    minimizeButton.addEventListener('click', function () {
        console.log("Minimize Pressed");
        ipcRenderer.send('minimize-window');
    });

    closeButton.addEventListener('click', function () {
        console.log("Close Pressed");
        ipcRenderer.send('close-window');
    });

})

// let isDragging = false;
// let initialMouseX;
// let initialMouseY;
// let initialElementX;
// let initialElementY;

// const titleBar = document.querySelector('.title-bar');
// const main = document.getElementById('draggableBox');

// titleBar.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     initialMouseX = e.clientX;
//     initialMouseY = e.clientY;
//     initialElementX = main.offsetLeft;
//     initialElementY = main.offsetTop;
//     main.style.cursor = 'grabbing';
// })

// document.addEventListener('mousemove', (e) => {
//     if (!isDragging) return;
  
//     const deltaX = e.clientX - initialMouseX;
//     const deltaY = e.clientY - initialMouseY;
  
//     main.style.left = initialElementX + deltaX + 'px';
//     main.style.top = initialElementY + deltaY + 'px';
//   });
  
//   document.addEventListener('mouseup', () => {
//     if (isDragging) {
//       // Reset cursor style after drag
//       main.style.cursor = 'grab';
//       isDragging = false;
//     }
//   });
  