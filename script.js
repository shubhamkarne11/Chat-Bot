let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text");

    try {
        let response = await fetch(Api_Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        "role": "user",
                        "parts": [{ text: userMessage }]
                    }
                ]
            })
        });
        let data = await response.json();
        let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse;
    } catch (error) {
        console.log(error);
    }
}

function showLoading() {
    let html = `<p class="text">Typing...</p>`; // Simple loading text
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
}

btn.addEventListener("click", () => {
    userMessage = prompt.value;
    if (!userMessage) return;

    let html = `<p>${userMessage}</p>`; // Display user message as text
    let userChatBox = createChatBox(html, "user-chat-box");
    chatContainer.appendChild(userChatBox);
    prompt.value = "";
    
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
    setTimeout(showLoading, 100);
});

document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
// disable F12 key  

if(e.keyCode ==123) {
alert("F12 disable");
  return false;
}
// disable c key
if(e.ctrlKey && e.keyCode == 67) { 
    alert("ctrl + c disable");
return false;

}

//disable U key
if(e.ctrlKey && e.keyCode == 85) { 
    alert("ctrl + u disable");
    return false;

}


}





