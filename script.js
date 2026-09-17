//1. identify and select button
let button;

button = document.getElementById('button');

//listen to event click on the button
//clicks the button - background color changes
button.addEventListener('click', function(){
    console.log("change color");
        document.body.style.background = "linear-gradient(to bottom, #1c2840, #9a9a75)"


})


//using AI here to help
window.addEventListener('scroll', handleScrollEvent);

function handleScrollEvent(){
    // 1. Get current scroll position metrics
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  // Trigger by exact pixel threshold (e.g., past 300px)
  if (scrollTop > 400) {
    console.log('Scrolled past 20px');
        document.body.style.background = "#c2c2a4"
  }

    if (scrollTop > 700) {
    console.log('Scrolled past 20px');
        document.body.style.background = "beige"
  }

}