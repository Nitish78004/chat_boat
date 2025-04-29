let prompt = document.querySelector("#prompt")
let container = document.querySelector(".container")
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let Api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBdQebC9QUZvh8-Xnqtxr5eTFy_20OM7jo';

function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text2"); // Correct selector for response text

    try {
        let response = await fetch(Api_url, {
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

        if (!response.ok) throw new Error('Network response was not ok'); // Handle response error

        let data = await response.json();
        let apiResponse = data?.candidates[0]?.content?.parts[0]?.text; // Use optional chaining for safety
        textElement.innerText = apiResponse || "No response from AI."; // Fallback message

    } catch (error) {
        console.error(error);
        textElement.innerText = "Sorry, something went wrong. Please try again."; // User feedback
    } finally {
        aiChatBox.querySelector(".loading").style.display = "none"; // Hide loading
    }
}

function showLoading() {
    let html = `
        <div class="img">
            <img src="chatbot-4736275_1920.png" alt=" " width="50px">
        </div>
        <p class="text2"></p>
        <img class="loading" src="load-32_256.gif" alt="loading" height="50">`;
    
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
    userMessage = prompt.value.trim(); // Trim whitespace
    if(userMessage==""){
        container.style.display="flex"
    }{
        container.style.display="none" 
    }


    if (!userMessage) return;

    let html = `
        <div class="img">
            <img src="icon-5359553_1920.png" alt=" " width="50px">
        </div>
        <p class="text1"> ${userMessage}</p>`; // Directly insert the message

    let userChatBox = createChatBox(html, "user-chat-box");
    chatContainer.appendChild(userChatBox);
    prompt.value = ""; // Clear input
    setTimeout(showLoading, 500); // Show loading

});
