const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



//
const greetings =['Im good you little piece of love',"Doing good thanks"];
const weather=['It\'s so nice outside','I hate winter','The weather is cold!']


recognition.onstart = function(){
   
    console.log('Voice is activated');

};


recognition.onresult = function(event)
{
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent= transcript;
    readOutLoud(transcript);
};

// Adding event listener to the btn
btn.addEventListener('click', ()=>{
    
    recognition.start();
});



// Creating the function that allows the computer to talk to user
function readOutLoud(message)
{
    const speech = new SpeechSynthesisUtterance();
    speech.text='Sorry I didn\'t get that, could you please try again?';
    if(message.includes('how are you') || message.includes('how\'s it going') || message.includes('how you do'))
    {
        const returningText= greetings[Math.floor(Math.random()*greetings.length)];
        speech.text=returningText;
    }

    // Creating  a senetence that the AI can say
    if (message.includes('weather'))
    {
        const returningText= weather[Math.floor(Math.random()*weather.length)];
        speech.text=returningText;
    }


   
    speech.volume=1;
    speech.rate=1;
    speech.lang="bs";
    speech.pitch=1;

    // allowing this method to speak when user talks
    window.speechSynthesis.speak(speech);
}