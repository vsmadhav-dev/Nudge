let time = document.querySelector("#time");
let form1 = document.querySelector('#todoForm')
let form2 = document.querySelector('.todo-form2');
let input1 =  document.querySelector('.todo-input');
let input2 = document.querySelector('#taskName');
let todoList = document.querySelector('#todoList');
let piority = document.querySelector('#taskPriority');
let label = document.querySelector('#taskTag');
let timeTocomplete = document.querySelector('#completionTime');

function fetchTask(fallbackFunction) {
    let alltasks = JSON.parse(localStorage.getItem('taskData')) || [];

    for (let task of alltasks) {

        let taskName = task.taskName;
        let taskPiority = task.taskPiority;
        let taskCreated = task.taskCreated;
        let labelValue = task.label;
        let timeComplete = task.timeComplete;


        if (typeof fallbackFunction === 'function') {
            fallbackFunction(taskName, taskPiority, labelValue, timeComplete, taskCreated);
        }
    }
}

function addTaskInUi(name , piorityValue , labelValue , timetocomplete , timeCreated){
    let li = document.createElement('li');
    li.classList.add('todo-card');
    let priorityClass = piorityValue === 'high' ? 'priority-high' : piorityValue === 'medium' ? 'priority-medium' : '';
    li.className = `todo-card ${priorityClass}`;

    li.innerHTML = `
        <label class="custom-checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-content">
            <span class="todo-title">${name}</span>
            <div class="todo-meta">
                ${labelValue ? `<span class="tag ${piorityValue === 'high' ? 'tag-high' : 'tag-medium'}">${labelValue}</span>` : ''}
                <span class="todo-time">${timetocomplete || timeCreated}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button type="button" class="btn-icon btn-ai" title="Get AI Suggestions">
                <span class="material-symbols-outlined">auto_awesome</span>
            </button>
            <button type="button" class="btn-icon btn-delete" title="Delete Task">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `;

    todoList.prepend(li);
}

function pushItem(item) {
    let taskData = JSON.parse(localStorage.getItem('taskData')) || [];
     taskData.push(item);
     localStorage.setItem('taskData', JSON.stringify(taskData));
     return true;
}

function Isuser() {
    let name = prompt("Enter your name to continue");
    while (!name){
        name = prompt("Enter your name to continue");
    }
    let user = name.toLowerCase().trim();
    if(localStorage.getItem('userName') == user){
       console.log('Account Found!' ,user);
        return true;
    }else{
        window.location.href = "html/registrationForm.html";
    }
}


function init() {
    let timetodisplay = new Date().toLocaleString();
    time.innerText = timetodisplay;
}document.addEventListener('DOMContentLoaded', ()=> {
    fetchTask(addTaskInUi)
})
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

    let taskDetails = {
        taskName: name,
        taskPiority: piorityValue,
        taskCreated: timeCreated,
        label: labelValue,
        timeComplete: timetocomplete
    };

    pushItem(taskDetails);
 addTaskInUi(name , piorityValue , labelValue , timetocomplete , timeCreated);
 console.log(taskDetails);
    console.log(timetocomplete);
    console.log(piorityValue);
    console.log(labelValue);
    console.log(timeCreated);
    console.log(name);


form1.reset();
form2.reset();
form2.classList.add('hide');
form1.classList.remove('hide');
})


Isuser();
setInterval(init, 1000);