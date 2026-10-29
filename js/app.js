let time = document.querySelector("#time");
let form1 = document.querySelector('#todoForm');
let form2 = document.querySelector('.todo-form2');
let input1 = document.querySelector('.todo-input');
let input2 = document.querySelector('#taskName');
let todoList = document.querySelector('#todoList');
let piority = document.querySelector('#taskPriority');
let label = document.querySelector('#taskTag');
let timeTocomplete = document.querySelector('#completionTime');
let filterType = document.querySelector('#filterType');
let priorityFilter = document.querySelector('#priorityFilter');
let completionFilter = document.querySelector('#completionFilter');
let goButton = document.querySelector('.btn-go');
let resetButton = document.querySelector('.btn-reset');
let apiBanner = document.querySelector('.api-banner');

import { pushItem } from "./modules/pushitem.js";
import { addTaskInUi } from "./modules/addtaskinui.js";
import { fetchTask } from "./modules/fetchtaskfromui.js";
import { deleteTask } from "./modules/deleteTask.js";
import { updateCheckboxStatus } from "./modules/updateCheckboxStatus.js";
import { pushTaskByPriority } from "./modules/pushTaskByPriority.js";
import { fetchTaskByPriority } from "./modules/fetchTaskByPriority.js";
import { deleteTaskByPriority } from "./modules/deleteTaskByPriority.js";
import { fetchCompletedTasks } from "./modules/fetchCompletedTasks.js";
import { updateCheckboxStatusByPriority } from "./modules/updateCheckboxStatusByPriority.js";

function Isuser() {
    let name = localStorage.getItem('userName');
    if (name) {
        console.log('Account Found!', name);
        return true;
    } else {
        window.location.href = "html/registrationForm.html";
    }
}

function init() {
    let timetodisplay = new Date().toLocaleString();
    time.innerText = timetodisplay;
}

// Unified DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Check if we were redirected because the API key was missing/hidden
    if (localStorage.getItem('showApiBanner') === 'true') {
        if (apiBanner) {
            apiBanner.classList.remove('hide');
            setTimeout(() => {
                apiBanner.classList.add('hide');
            }, 2000);
        }
        localStorage.removeItem('showApiBanner');
    }

    // Fetch and display initial tasks
    fetchTask(addTaskInUi);
});

form1.addEventListener('submit', (evt) => {
    evt.preventDefault();
    input2.value = input1.value;
    form1.classList.add('hide');
    form2.classList.remove('hide');
});

form2.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let name = input2.value.trim();
    let timeCreated = new Date().toLocaleString();
    let piorityValue = piority.value;
    let labelValue = label.value.trim();
    let timetocomplete = timeTocomplete.value;
    let dueDate = document.querySelector('#dueDate').value;

    let taskDetails = {
        taskName: name,
        taskPiority: piorityValue,
        taskCreated: timeCreated,
        label: labelValue,
        timeComplete: timetocomplete,
        dueDate: dueDate,
        checked: false
    };

    pushItem(taskDetails);
    let pushedTask = pushTaskByPriority(taskDetails);
    if (pushedTask) {
        console.log('All set task by priority pushed');
    }

    addTaskInUi(name, piorityValue, labelValue, timetocomplete, timeCreated, false, dueDate);

    form1.reset();
    form2.reset();
    form2.classList.add('hide');
    form1.classList.remove('hide');
});

filterType.addEventListener('change', () => {
    priorityFilter.classList.add('hide');
    completionFilter.classList.add('hide');
    goButton.classList.remove('hide');

    if (filterType.value === 'priority') {
        priorityFilter.classList.remove('hide');
    } else if (filterType.value === 'completion') {
        completionFilter.classList.remove('hide');
    }
});

todoList.addEventListener('click', (e) => {
    let deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
        let card = e.target.closest('.todo-card');
        let taskName = card.querySelector('.todo-title').textContent.trim();
        let priorityClass = Array.from(card.classList).find(
            className => className !== 'todo-card'
        );
        deleteTask(taskName);
        deleteTaskByPriority(taskName, priorityClass);
        card.remove();
    }
});

todoList.addEventListener('click', (evt) => {
    let aiSuggestionBtn = evt.target.closest('.btn-ai');
    if (aiSuggestionBtn) {
        console.log('Ai Suggestion Button selected!', aiSuggestionBtn);
        let card = evt.target.closest('.todo-card');

        let taskName = card.querySelector('.todo-title').textContent;
        console.log('AI suggestion requested for ', taskName);
        window.location.href = `html/suggestion.html?task=${encodeURIComponent(taskName.trim())}`;
        localStorage.setItem('selectedTask', taskName);
    }
});

todoList.addEventListener('change', (e) => {
    let checkbox = e.target.closest('.task-checkbox');
    if (checkbox) {
        let card = checkbox.closest('.todo-card');
        let taskName = card.querySelector('.todo-title').textContent.trim();
        let isChecked = checkbox.checked;

        if (isChecked) {
            card.classList.add('completed');
        } else {
            card.classList.remove('completed');
        }

        updateCheckboxStatus(taskName, isChecked);

        let TRUE = updateCheckboxStatusByPriority(taskName, isChecked);
        if (TRUE) {
            console.log('Success in updating priority checklist');
        } else {
            console.log('Error');
        }
    }
});

goButton.addEventListener('click', () => {
    todoList.innerHTML = '';

    if (filterType.value === 'priority') {
        const p = priorityFilter.value;
        if (p === 'all') {
            fetchTask(addTaskInUi);
        } else {
            fetchTaskByPriority(p);
        }
    } else if (filterType.value === 'completion') {
        const c = completionFilter.value;        // all | completed | uncompleted
        if (c === 'completed') {
            fetchCompletedTasks(addTaskInUi, true);
        } else if (c === 'uncompleted') {
            fetchCompletedTasks(addTaskInUi, false);
        } else {
            fetchTask(addTaskInUi);
        }
    }
});

resetButton.addEventListener('click', () => {
    location.reload();
});

Isuser();
setInterval(init, 1000);