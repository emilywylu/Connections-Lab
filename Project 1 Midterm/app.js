window.addEventListener('load',function(){
    console.log('page is loaded');

    //grab elements
    const form = document.getElementById('section-form');
    const results = document.getElementById('results');
    const copyButton = document.getElementById('copy-button');

    // fetch the json
    // put in a variable
    let jsonData = null;

    fetch('data.json') //requesting for information
        .then(response => response.json())
        .then(data => {
            console.log(data.reviews)
            jsonData = data; // save for later use
        })
        .catch(error => {
            console.log("error", error)
        })

    form.addEventListener('submit',function (event){
        event.preventDefault(); //stay on the same page, not refreshed
        copyButton.hidden = true;


        const formData = new FormData(form);
        const category = formData.get('Category'); // "food", "service", etc
        const rating = formData.get('Rating'); // "moderate", "strong", etc
        const spot = formData.get('homepage'); // text input


        if (!jsonData){ //if jsonData is not something useable
            results.textContent = "Data has not loaded yet.";
            return; //stops, instead of crashing
        }

        if (!category || !rating){
            results.textContent = 'Please pick a category and an intensity';
            return;
        }
        const section =jsonData.reviews.find(item=> item.category === category);
        if (!section){
            results.textContent = 'Section not found.';
            return;
        }
        
        // pick phrase for chosen intensity
        const phrase = section[rating];
        const intro = jsonData.intros[rating];

        if (!phrase || !intro){
            results.textContent = "Missing text for that combination";
            returnl
        }
        //call the "results" div, and the html content inside it. 
        // ${anything in here} is inserted into the string.
        results.textContent =
            `${spot} ${intro}. Their ${category} was ${phrase}. I do not recommend. Avoid this place at all costs.`;
        copyButton.hidden = false;
        confetti({
            particleCount:30,
            shapes:['star']
        });
        });
        // copy button handler (NEW): after the submit handler, still inside load
    copyButton.addEventListener('click', async function () {
        try {
            await navigator.clipboard.writeText(results.textContent);
            copyButton.textContent = 'COPIED! NOW SEND IT TO GOOGLE';
            setTimeout(() => {
                copyButton.textContent = 'COPY TO CLIPBOARD';
            }, 2000);
        } catch (err) {
            console.log('Copy failed', err);
            copyButton.textContent = 'COPY FAILED';
        }
    });   
})


    // let button = document.getElementById('bad-button')
    // button.addEventListener('click',function(){
    //     let inputText = document.getElementById("bad-button").innerText;

        
    //     console.log("bad button was clicked");
    //     console.log("the text available is : " + inputText);
    // })