function Sum(){
    let ans = 0;
    for(let i = 0 ; i <= 10000 ; i++ ){
        console.log(i);
    }
}

function doSum(){
    Sum();
}

// setTimeout(doSum, 3000);
// console.log("Hello World!!");

function sayHello(){
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Hello");
        }, 3000)        
    });
}

// Printing it by .then
const value = sayHello();
value.then(function(resolvedVal) {
    console.log(resolvedVal);
})

// Printing it by using the async await 
async function main(){
    const value = await sayHello();
    console.log(value);
}

main();