let time = document.querySelector("#time");
let form1 = document.querySelector('#todoForm')
let form2 = document.querySelector('.todo-form2');
let input1 =  document.querySelector('.todo-input');
let input2 = document.querySelector('#taskName');
let todoList = document.querySelector('#todoList');
let piority = document.querySelector('#taskPriority');
let label = document.querySelector('#taskTag');
let timeTocomplete = document.querySelector('#completionTime');

import {pushItem} from "./modules/pushitem.js";
import {addTaskInUi} from "./modules/addtaskinui.js";
import {fetchTask} from "./modules/fetchtaskfromui.js";


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
}
document.addEventListener('DOMContentLoaded', ()=> {
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


// ---- Filter dropdowns: show/hide based on "Filter By" choice ----
let filterType = document.querySelector('#filterType');
let priorityFilter = document.querySelector('#priorityFilter');
let completionFilter = document.querySelector('#completionFilter');

filterType.addEventListener('change', () => {
    priorityFilter.classList.add('hide');
    completionFilter.classList.add('hide');

    if (filterType.value === 'priority') {
        priorityFilter.classList.remove('hide');
    } else if (filterType.value === 'completion') {
        completionFilter.classList.remove('hide');
    }
});
