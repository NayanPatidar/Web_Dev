// let add = function(x, y){
//     return x + y;
// }(5, 9);

// let result = add(3,5);
// console.log(add);

function personalDetails(){
    const course = {
        name : 'Nayan',
        age : 17,
        marks : {
            Maths: 25,
            Physics: 50
        },
        enroll() {
            console.log("Enrolled!");
        }
    }

    return course;
}

function Details(){
    this.age = 5;
    this.enroll = function(){
        console.log("Logged");
    }
}

const modifiedChanges = new Details();
modifiedChanges.enroll()