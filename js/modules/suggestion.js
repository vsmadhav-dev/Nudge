let topbarTask = document.querySelector('.topbar__task');
let aiMessage = document.querySelector('.message');
let chat = document.querySelector('.chat');
let userNote = document.querySelector('#userNote');
let askForm = document.querySelector('#askForm');
let quickButtons = document.querySelectorAll('.quick__btn');

import {getAPIkey} from "./getAPi.js";

const taskName = localStorage.getItem('selectedTask') || 'this task';
const API = localStorage.getItem('userAPIkey');

if (!API){
let DATA = getAPIkey();
if (DATA){
    console.log('API key fetched successfully');
}else{
    console.log('Problem in fetching API key');
}
}
const prompts = {
    "I'm stuck": `I'm stuck on "${taskName}". Can you help me get unstuck?`,
    "Break it down": `Can you break "${taskName}" down into smaller steps?`,
    "Only 30 min": `I only have 30 minutes for "${taskName}". What should I do?`
};

function showSuggestionScreen() {
    topbarTask.textContent = taskName;
    aiMessage?.remove();
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

function sendPrompt(text) {
    addUserMessage(text);
    userNote.value = '';
    // The AI reply will be added here later.
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


askForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const text = userNote.value.trim();
    if (text) sendPrompt(text);
});