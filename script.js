let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCtD4ghTE_1Decy_1naHwLZnJ_-aTkyea8';

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





