"use strict";
let a = 3;
// console.log(a);
function greet(firstName) {
    console.log(`Hello ${firstName}`);
}
// greet("Nayan");
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
function doSomething(keyPressed) {
    if (keyPressed == Direction.Right) {
        console.log(keyPressed);
    }
}
function firstElement(arr) {
    return arr[0];
}
// const value = firstElement(["Nayan", "Patidar"]);
// console.log();
function GenericfirstElement(arr) {
    return arr[0];
}
const value = GenericfirstElement(["Nayan", "Patidar"]);
console.log(value.toUpperCase());
