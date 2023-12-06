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

// console.log(`Factorial is ${factorial(10)}`);
let present = true;

function isAnagram(str1, str2) {
    smallStr1 = str1.toLowerCase();
    smallStr2 = str2.toLowerCase();
    let lettersStr1 = smallStr1.split("");
    let lettersStr2 = smallStr2.split("");
    lettersStr1.sort();
    lettersStr2.sort();
    if (lettersStr1.join("") == lettersStr2.join("")){
        return true;
    } 
    return false;
}
// console.log(isAnagram('Debit Card', 'Bad Credit'));

function calculateTotalSpentByCategory(transactions) {
    let data = []
    let present = true;
    transactions.forEach(element => {
  
        for(let i in data){
            if (data[i].category === element["category"]){
                data[i].totalSpent += element["price"];
                present = false;
            }
        }
        if (present){
        let currenctObj = {category: element["category"], totalSpent: element["price"]}
        data.push(currenctObj);
        }
        present = true;
    });
    return data;
}

let arrayObj = [
    {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
    },
    {
        id: 2,
        timestamp: 1656259600000,
        price: 20,
        category: 'Food',
        itemName: 'Burger',
    },
    {
        id: 3,
        timestamp: 1656019200000,
        price: 15,
        category: 'Clothing',
        itemName: 'T-Shirt',
    },
    {
        id: 4,
        timestamp: 1656364800000,
        price: 30,
        category: 'Electronics',
        itemName: 'Headphones',
    },
    {
        id: 5,
        timestamp: 1656105600000,
        price: 25,
        category: 'Clothing',
        itemName: 'Jeans',
    },
];

console.log(calculateTotalSpentByCategory(arrayObj));