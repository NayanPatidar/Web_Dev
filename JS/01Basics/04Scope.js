let scope = "global";
function checkscope(){
    scope = "local";
    var myScope = 100
    return [scope,myScope];
}

// console.log(checkscope())

function test(o){
    var i = 0;
    if(typeof(o) === "object"){
        console.log("Here")
        for (elem in o) {
            console.log(`${elem}: ${o[elem]}`)
        }
    }
}
let something = {ok:true};
test(something)

let fruits = [['apple'], ['banana'], ['boys'], ['testing']];
let numbers = new Array(1, 2, 3, 4, 5);
console.log(fruits);