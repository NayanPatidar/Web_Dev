
// Question-1:  Write a function that takes an array and a callback function. Apply the callback function to each element of the array and return a new array with the modified elements.

function mainFunc(num){
    console.log(`${num} - ${cube(num)}`);
}

let cube = (num) => num*num*num;

let arr = [11, 22, 33, 44, 55];

// arr.forEach(mainFunc);

// Question-2:  Write a function that takes an array of numbers and returns a new array containing only the odd numbers.

function oddArray(ori_array){
    let odd_array = [];
    for (let element in ori_array){
        if(ori_array[element] % 2 !== 0){
            odd_array.push(ori_array[element]);
        }
    }
    return odd_array;
}

let mix_arr = [1,2,4,5,6,0,7, 9,7];
let new_arr = oddArray(mix_arr);
console.log(new_arr);

