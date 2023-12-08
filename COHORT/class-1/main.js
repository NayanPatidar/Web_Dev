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
// console.log(user);

const objUsers = {
    "name"   : "Harkirat",
    "age"    : 24,
    "gender" : "male",
}
// console.log(objUsers);

function objectMethod(obj){
    console.log("Original Object:", obj);

    let keys = Object.keys(obj);
    console.log("After Object.keys():", keys);

    let values = Object.values(obj);
    console.log("After Object.values():", values);

    let enteries = Object.entries(obj);
    console.log("After Object.enteries():", enteries);

    let hasProp = obj.hasOwnProperty("property");
    console.log("After hasOwnPropert():", hasProp);

    let newObj = Object.assign({}, obj, {Stabiliy : "Moderate"});
    console.log("After Object.assign():", newObj);

}

let objec = {
    "Serial_Number" : 839834,
    "Info" : "v4Connection_rqrksid",
    "Status" : true
}

objectMethod(objec);