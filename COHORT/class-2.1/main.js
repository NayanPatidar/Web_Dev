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

fs.readFile('/media/nayan/Core 1/Javascript/Web_Dev/COHORT/class-2.1/Texting.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading the file: ${err}`);
        return;
    }

    console.log(`File Content: ${data}`);
});

for (let i = 0; i < 100000; i++) {
    console.log(i);
}