//-- Async Functions --

// 1] Callback Functions
// 2] Promises 


// 1] Callback FUnctions  :- Basically the function
// is passed as a parameter then it is called form 
// the function it has been sent
function testingCallback(callback) {
   setTimeout(() => {
      callback();
   }, 5000);
}
// here in the parameter a function is 
// created and then sent
// testingCallback(function blast(){
//     console.log("BoOm booM !!");
// })


// 2] Promises

const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve(
        console.log("PLAY!_")
       ) 
    }, 3000);
})

prom.then(
    success,
    failure
    );

function success(){
    console.log(`It is succeded!!`);
}

function failure(){
    console.log(`It is failed!!`);
}