var userName = "Nayan Patidar";
var age = 17;
const uid = "RA23";

console.log(` 
    Name : ${userName}
    Age  : ${age}
    UID  : ${uid} 
`)

let details = "Nayan - Age : " + 17;
console.log(details + " "+ typeof(details))
let myName = details.substring(0, details.indexOf("-")-1)
let ageOfPersom = details.substring(details.indexOf(":")+1, details.length)
console.log(ageOfPersom)
