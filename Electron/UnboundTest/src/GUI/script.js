console.log("Yooo");

    let buttons = document.querySelectorAll('.features ul li input[type="radio"]');
    // console.log(buttons);

    buttons.forEach((button)=> {
        button.addEventListener('change', function(){

            let AlllistItems = document.querySelectorAll('.features ul li');
            AlllistItems.forEach((listItem) => {
                listItem.style.backgroundColor = '#fff'; 
                listItem.style.color = '#000'
            });
            let listItem = button.closest('li');

                if (button.checked) {
                    listItem.style.backgroundColor  = '#141321';
                    listItem.style.color = '#fff'
                } else {
                    console.log("Here in else");
                    listItem.style.backgroundColor  = '#fff';
                }
            })  

    })

    