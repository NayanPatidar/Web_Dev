// let userName = "Nayan"

// if (userName == true){
//     console.log(`Hello ${userName}`);
// }

// let num = [1,4,0,2,4,9,2,2]
// for (const element in num) {
//     console.log(num[element]);
// }

const value = "Hi, This is Nayan Patidar";
const words = value.split(" ");
// console.log(words);

const stringUsers = `{"name": "Nayan","age":18,"gender":"male"}`
const user = JSON.parse(stringUsers)
console.log(user);

const objUsers = {
    "name"   : "Harkirat",
    "age"    : 24,
    "gender" : "male",
}
console.log(objUsers);
