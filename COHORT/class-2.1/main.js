// Easy 

// Counter
function counter(timeinSec){
    let i  = 1;
        let interval = setInterval(() => {
            console.log(i);
            i++;
            if (timeinSec < i){
                clearInterval(interval);
            } 
        }, 1000);
}

// counter(4);

// Counter without setInterval

let i = 1;
function couterTwo(current,time){
        setTimeout(() => {
            console.log(current);
            if(current < time){
            couterTwo(current = current + 1, time);
            }
        }, 1000);
}

// couterTwo(1,5)

// Reading a file operation

const fs = require('fs');
const { CLIENT_RENEG_WINDOW } = require('tls');

fs.readFile('/media/nayan/Core 1/Javascript/Web_Dev/COHORT/class-2.1/Texting.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading the file: ${err}`);
        return;
    }

    // console.log(`File Content: ${data}`);
});

// for (let i = 0; i < 100000; i++) {
//     console.log(i);
// }


// Adding the content to the file

let dataToAdd = "\nYoo keep going !!";

fs.appendFile('/media/nayan/Core 1/Javascript/Web_Dev/COHORT/class-2.1/Texting.txt', dataToAdd, (err, data) => {
    if (err) {
        console.error(`Error reading the file: ${err}`);
        return;
    }

    console.log(`File Content: ${data}`);
})


//Medium

// Remove spaces from file 

let dataFromFiles = "";
let newData = "";

function removeSpaces(inputString) {
    return inputString.replace(/ +/g, ' ');
}

fs.readFile('/media/nayan/Core 1/Javascript/Web_Dev/COHORT/class-2.1/Texting.txt', 'utf8', (error, data) => {
    if (error != null){
        log.error("We got error");
    } else {
    dataFromFiles = data;
    newData = removeSpaces(dataFromFiles);
    console.log(`Data to Add : ${newData}`);
    fs.appendFile('/media/nayan/Core 1/Javascript/Web_Dev/COHORT/class-2.1/Texting.txt', newData, (err, data) => { 
     });
    }
})


// Using 1-counter.md or 2-counter.md from the easy section, can you create a clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

// 1] HH:MM::SS (Eg. 13:45:23)

// 2]HH:MM::SS AM/PM (Eg 01:45:23 PM)
  
// 1]

let timeData = [10,59,0];
console.clear();
function counter(){
    let MaxSec = 60;
    let MaxMin = 60;
    let Day = 12;
    let i  = 55;
        let interval = setInterval(() => {
            console.clear();
            timeData[2] = i;
            console.log(`${timeData[0]}:${timeData[1]}:${timeData[2]}`);
            i++;
            if (MaxSec < i){
                timeData[1] += 1;
                i = 1; 
                if (timeData[1] >= 59){
                    timeData[0] += 1;
                    timeData[1] = 0;
                }
            } 
        }, 1000);
}
counter();

