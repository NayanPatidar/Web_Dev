var colours =  [
    "rgb(0, 255, 98)",
    "rgb(255, 37, 248)",
    "rgb(255, 255, 39)"
];

var currentIndex = 0;

function changeColorContinuously() {

    var element = document.getElementById("colourChanging");
    element.style.color = colors[currentIndex];

}

var intervalId = setInterval(changeColorContinuously, 1000);

setTimeout(function() {
    clearInterval(intervalId);
}, 10000);
