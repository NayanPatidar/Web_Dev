// Question-1:  Write a function that takes a name as an argument and logs a greeting message to the console, like "Hello, [Name]!".

let message = function(name){
    console.log(`Hello, ${name}!`);
}

// message("Nayan")

// Question-2:  Write a function that takes two parameters, adds them together, and returns the result.

let sum = function(One, Two){
    return One+Two
}

// console.log(sum(200,100));

// Question-3:  Write a function that takes the current hour as a parameter and logs a different greeting message based on whether it's morning, afternoon, or evening.

let dayStatus = function(hour){
    if (hour > 6 && hour < 8){
        console.log("It is morning");
    } else if (hour > 12 && hour < 18 ){
        console.log("It is afternoon");
    } else if (hour < 24 && hour > 18 ){
        console.log("It is evening");
    }
}

// dayStatus(14);

// Question-7:  Write a function that has a local variable and another function that has a global variable. Demonstrate the difference between global and local scope.

function globalCheck(num) {
    if (num > 0){
    var variable = 100;
    }
    console.log(`Global Variable - ${variable}`);
}

function localCheck(num) {
    if (num > 0){
        let variableTwo = 9;
    }
    console.log(`Local Variable - ${variableTwo}`);
}

// globalCheck(10);
// localCheck(5);

// Question-8:  Write a function that returns another function. The inner function should have access to a variable from the outer function.

function outer(name){
    this.input = name;

    function inner(name){
        console.log(`Name is ${name}`);
    }
    return inner(this.input)
}

// outer("Nayan")

// Question-9:  Write a recursive function to calculate the factorial of a given number.


function factorial(number){
    if (number === 0){
        return 1;
    } else {
        return number * factorial(number - 1)
    }
}

console.log(`Factorial is ${factorial(10)}`);