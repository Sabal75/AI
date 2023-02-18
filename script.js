const texts = document.querySelector(".texts");

const startBtn = document.createElement("button");

startBtn.innerHTML = "Start listening";

const result = document.createElement("div");

const processing = document.createElement("p");

document.write("<body><h1>Ask Anything!</h1><p>Give it a try with 'hello', 'how are you', 'what's your name', 'what time is it', 'stop', ... </p></body>");

document.body.append(startBtn);

document.body.append(result);

document.body.append(processing);
startBtn.style.background = "rgb(68, 70, 84)";
startBtn.style.color = "#fff";
startBtn.style.width = "200px";
startBtn.style.height = "40px";
startBtn.style.border = "none";
startBtn.style.borderRadius = "5px";
startBtn.style.backgroundColor = "rgb(68, 70, 84)";
startBtn.style.marginLeft = "1200px";
startBtn.style.marginTop = "-250px";
startBtn.style.cursor = "pointer";


 document.body.style.backgroundColor = "rgb(52, 53, 64)";
 document.body.style.color = "#fff";
 document.body.style.fontFamily = "'Poppins', sans-serif";

 const heading = document.querySelector("h1");

heading.style.color = "rgba(255, 255, 255, 0.322)";
heading.style.textAlign = "center";
heading.style.width = "100%";
heading.style.fontSize = "50px";
heading.style.marginBottom = "10px";

const paragraph = document.querySelector("p");

paragraph.style.color = "rgba(255, 255, 255, 0.322)";
paragraph.style.textAlign = "center";
paragraph.style.width = "100%";
paragraph.style.fontSize = "20px";
paragraph.style.marginBottom = "10px";


// speech to text

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let toggleBtn = null;

if (typeof SpeechRecognition === "undefined") {

                startBtn.remove();

                result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";

} else {

                const recognition = new SpeechRecognition();

                recognition.continuous = true;

                recognition.interimResults = true;

                recognition.onresult = event => {

                                const last = event.results.length - 1;

                                const res = event.results[last];

                                const text = res[0].transcript;

                                if (res.isFinal) {

                                                processing.innerHTML = "processing ....";

 

                                                const response = process(text);

                                                const p = document.createElement("p");

                                                p.innerHTML = `You said: ${text} </br>Aaryan said: ${response}`;

                                                processing.innerHTML = "";

                                                result.appendChild(p);

 

                                                // text to speech

                                                speechSynthesis.speak(new SpeechSynthesisUtterance(response));

                                } else {

                                                processing.innerHTML = `listening: ${text}`;

                                }

                }

                let listening = false;

                toggleBtn = () => {

                                if (listening) {

                                                recognition.stop();

                                                startBtn.textContent = "Start listening";

                                } else {

                                                recognition.start();

                                                startBtn.textContent = "Stop listening";

                                }

                                listening = !listening;

                };

                startBtn.addEventListener("click", toggleBtn);

 

}

 

// processor

function process(rawText) {
  let text = rawText.toLowerCase();

  let response = null;

  switch(text) {
    case "hello":
      response = "Hello! How can I help you today?";
      break;

    case "what is your name":
      response = "I am an AI language model created with HTML and CSS along with JS. You can also call me Aaryan";
      break;

    case "how are you":
      response = "As a language model AI, I don't have feelings but I'm here to assist you with any information or questions you have! How can I assist you today?";
      break;

    case "what time is it":
      response = "It is " + new Date().toLocaleTimeString();
      break;

    case "stop":
      response = "Bye!!";
      toggleBtn();
      break;

      case "what is your favourite number":
      response = "My favourite number is 69 and 420.";
      break;


  }

  if (!response) {
    window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
    return `I found some information for "${rawText}"`;
  }

  return response;
}


 