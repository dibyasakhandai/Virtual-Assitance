let btn = document.querySelector("#btn");
let output = document.querySelector("#output");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-IN";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onstart = () => {
    btn.style.display = "none";
    voice.style.display = "block";
};

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    output.innerText = `You said: ${transcript}`;
    btn.innerHTML = `<img src="mic.svg" alt="mic"><span>${transcript}</span>`;
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
    btn.style.display = "block";
    voice.style.display = "none";
};

recognition.onend = () => {
    btn.style.display = "block";
    voice.style.display = "none";
    btn.innerHTML = `<img src="mic.svg" alt="mic"><span>Click Here to Talk to me</span>`;
};

function takeCommand(message) {
    if (message.includes("hello")) {
        speak("Hello, what can I help you with?");
    } 
    else if (message.includes("bye")){
        speak("Bye, Have a nice day . Hope i could help you out");
    }
    else if (message.includes("how are you")) {
        speak("I'm doing great, thank you. How can I assist you?");
    } else if (message.includes("your name")) {
        speak("I am your virtual assistant.");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        speak(`The time is ${time}`);
    } else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com/feed/");
    } else if (message.includes("open github")) {
        speak("Opening GitHub");
        window.open("https://github.com/");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com/");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://www.whatsapp.com/");
    } else if (message.includes("open flipkart")) {
        speak("Opening Flipkart");
        window.open("https://www.flipkart.com/");
    } else if (message.includes("open amazon")) {
        speak("Opening Amazon");
        window.open("https://www.amazon.in/");
    } 
    else {
        speak(`This is what I found on the internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}

window.addEventListener("load", () => {
    wishMe();
});

btn.addEventListener("click", () => {
    recognition.start();
});
