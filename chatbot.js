const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to fetch chatbot response using OpenAI API
async function fetchBotResponse(userMessage) {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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', // Replace with your API key
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: userMessage,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching response:', error);
        return 'Sorry, I am having trouble responding right now.';
    }
}

// Function to add a message to the chatbox
function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = text;
    messageDiv.appendChild(messageText);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle send button click
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, true);
    userInput.value = '';

    addMessage('Typing...', false);
    const botResponse = await fetchBotResponse(userMessage);
    chatBox.lastChild.remove(); // Remove "Typing..." message
    addMessage(botResponse, false);
});

// Handle pressing Enter to send message
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
