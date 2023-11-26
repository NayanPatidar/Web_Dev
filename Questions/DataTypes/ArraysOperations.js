let arr = [10,20,30,40,50]
// console.log(arr);

// Initiaizing array in differenet way 
// - By using the array constructor

let new_arr = new Array(1, 2, 3, 4, 5, 0)
new_arr[6] = 6;
console.log(new_arr);

// Removing one element from the end
new_arr.pop();
console.log(`Pop Function - ${new_arr}`);

// Removing the first element 
new_arr.shift();
console.log(`Shift Function - ${new_arr}`);

// Adding new element at the begginning 
new_arr.unshift(55);
console.log(`Unshift Function - ${new_arr}`);

// Removing a certain portion 
new_arr.slice(5,1);
console.log(`Slice - ${new_arr}`);

// Reverse 
new_arr.reverse();
console.log(`Reverse - ${new_arr}`);

// Sort
new_arr.sort();
console.log(`Sort - ${new_arr}`);

// Slice 
let slicedArray = new_arr.slice(0, 1)
console.log(`Sliced Array - ${slicedArray}`);
console.log(`Array After Slicing - ${new_arr}`);

// Includes 
let present = new_arr.includes(4)
console.log(present);