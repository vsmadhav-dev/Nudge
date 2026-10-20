let topbarTask = document.querySelector('.topbar__task');
let aiMessage = document.querySelector('.message');
let chat = document.querySelector('.chat');
let userNote = document.querySelector('#userNote');
let askForm = document.querySelector('#askForm');
let quickButtons = document.querySelectorAll('.quick__btn');
let submitButton = document.querySelector('.composer__send');
let changeAPI = document.querySelector('.change-api-key');

import { getAPIkey } from "./getAPi.js";
import { fetchSuggestion } from "./SendRespnseRequest.js";


const taskName = localStorage.getItem('selectedTask') || 'this task';
const API = localStorage.getItem('userAPIkey');

if (!API) {
    let DATA = getAPIkey();
    if (DATA) {
        console.log('API key fetched successfully');
    } else {
        console.log('Problem in fetching API key');
    }
}

const prompts = {
    "I'm stuck": `I'm stuck on task "${taskName}". Can you help me get unstuck?`,
    "Break it down": `Can you break this task "${taskName}" down into smaller steps?`,
    "Only 30 min": `I only have 30 minutes for my task "${taskName}". What should I do?`
};

function showSuggestionScreen() {
    topbarTask.textContent = taskName;
    aiMessage?.remove();
}
function changeAPIkey(){
    let userAPI = prompt('Enter your Gemini API Key');
    while (!userAPI.trim()){
        userAPI = prompt('Enter your Gemini API Key');
    }
     localStorage.setItem('userAPIkey' , userAPI);
   return true;
}

function addUserMessage(text) {
    const box = document.createElement('article');
    box.className = 'message message--user';

    const p = document.createElement('p');
    p.className = 'message__text';
    p.textContent = text;

    box.appendChild(p);
    chat.appendChild(box);
    chat.scrollTop = chat.scrollHeight;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function addAiMessage(text) {
    const box = document.createElement('article');
    box.className = 'message';

    box.innerHTML = `
        <p class="message__text">${escapeHtml(text)}</p>
    `;

    chat.appendChild(box);
    chat.scrollTop = chat.scrollHeight;
    submitButton.disabled = false;
}


showSuggestionScreen();

quickButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const prompt = prompts[btn.textContent.trim()];
        if (prompt) {
            userNote.value = prompt;
            userNote.focus();
        }
    });
});

askForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const Text = userNote.value.trim();
    if (Text) {
        addUserMessage(Text);
        userNote.value = '';
        submitButton.disabled = true;
 const aiReply = await fetchSuggestion(Text)
        addAiMessage(aiReply || 'error occurred');

    }
});
changeAPI.addEventListener('click', (evt) =>
{
    if (changeAPIkey()){
        console.log('API key change successfully')
    }
});