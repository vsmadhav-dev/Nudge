let time = document.querySelector("#time");
let form1 = document.querySelector('#todoForm')
let form2 = document.querySelector('.todo-form2');
let input1 =  document.querySelector('.todo-input');
let input2 = document.querySelector('#taskName');
let todoList = document.querySelector('#todoList');
let piority = document.querySelector('#taskPriority');
let label = document.querySelector('#taskTag');
let timeTocomplete = document.querySelector('#completionTime');
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

    console.log(timetocomplete);
    console.log(piorityValue);
    console.log(labelValue);
    console.log(timeCreated);
    console.log(name);

    let li = document.createElement('li');
    li.classList.add('todo-card');
    todoList.appendChild(li);

})
Isuser();
setInterval(init, 1000);