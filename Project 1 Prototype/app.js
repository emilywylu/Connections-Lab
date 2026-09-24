window.addEventListener('load',function(){
    console.log('page is loaded');

    // fetch('http://api.open-notify.org/astros.json') //requesting for information
    // .then(function(response){ //returns object that states the status of the request
    //     return response.json() //information is ready, then retrieve information
    // })
    // .then(function(data){
    //     //do something
    //     console.log(data.number)
    // })

    fetch('data.json') //requesting for information
    .then(response => response.json() //information is ready, then retrieve information
    )
    .then(data => {
        let nameElement = document.getElementById('rating'); // looking for the element
        nameElement.innerHTML = data.results[0].rating //putting the results we got from the API into the element
    })
    .catch(error => {
        console.log("error")
    })

    let button = document.getElementById('bad-button')
    button.addEventListener('click',function(){
        let inputText = document.getElementById("rating").innerText;

        
        console.log("bad button was clicked");
        console.log("the text available is : " + inputText);
    })
})


// //1. rewriting anonymous function - fat arrow syntax

// function(a){
//     return a+10;
// }

// //remove the word function, replace with arrow
// (a) => {
//     return a+10;
// }

// //2. remove the brackets if there is only one rgument
// a => return a+10;


// //3. remove "return" if that's the only thing happening in the function
// a => a+10;