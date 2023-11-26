// Input the distance in Kilometer and Convert into Meter and Centimeter.

let distance = 100;
let toMeter = (kilometers) => kilometers*1000
let toCentimeter = (kilometers) => toMeter(kilometers) * 100
// let meters = toMeter(distance)
// console.log(meters);
// let centimeter = toCentimeter(distance)
// console.log(centimeter);


// WAP to input radius of a circle and log the area of circle.

let radius = 10;
let areaCalc = (radius) => 3.14 * ((radius) ** 2)
// console.log(areaCalc(radius));


// WAP to input two numbers and perform arithmetic operations on those numbers.

let one = 10 , two = 20 ;

let addition = (a,b) => one+two;
let subtraction = (a,b) => one-two;
let division = (a,b) => one/two;
let multiplication = (a,b) => one*two;

// console.log(addition(one, two));
// console.log(subtraction(one, two));
// console.log(multiplication(one, two));
// console.log(division(one, two));

// WAP to calculate total marks in two subject and then calculate percentage.

let subOneMarks = 90;
let subTwoMarks = 89;

let percentage = (one, two) => (one+two)/200 * 100;

// console.log(percentage(subOneMarks, subTwoMarks));


//  Write a JavaScript program to demonstrate the use of assignment operators on variables.

let valOne = 10;

// console.log(valOne);

valOne **= 10

// console.log(valOne);

// Ternary Operator

let a = 50;
let b = 10;

let ans = a > b ? a : b  
// console.log(ans);

// Types of data types

// console.log(typeof 10);

// console.log(typeof "Shubh");

// console.log(typeof true);

// console.log(typeof null);

// console.log(typeof undefined);

// console.log(typeof [1, 2, 3]);

// console.log(typeof { name: "Shubh" });

// console.log(typeof function () { });

// console.log(typeof new Date());

// console.log(typeof new Error());

// Concatenate 

// let firstName = "Nayan"
// let secondName = "Patidar"
// console.log(firstName + " " + secondName);

function map(f, a){
    const result = new Array(a.length);
    for (let i = 0; i < a.length; i++){
        result[i] = f(a[i]);
    }
    return result;
}

let cube = (x) => x*x*x;

const numbers  = [0, 1, 5, 10, 25];
console.log(map(cube, numbers));

