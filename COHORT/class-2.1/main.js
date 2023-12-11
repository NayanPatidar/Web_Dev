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

couterTwo(1,5)

