console.log("Yooo");

document.addEventListener('DOMContentLoaded', () => {
    // console.log("In the fullt loaded DOM");
    let buttons = document.querySelectorAll('.features ul li input[type="radio"]');
    // console.log(buttons);

    buttons.forEach((button)=> {
        console.log(button);
        button.addEventListener('checks', ()=> {
            if (button.checked){
                console.log(`${button} is checked`);
            }else {
                console.log(`${button} is not checked`);
            }
        })
    })
})