let time = document.querySelector("#time");
let form1 = document.querySelector('#todoForm')
let form2 = document.querySelector('.todo-form2');


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
    form1.classList.add('hide');
    form2.classList.remove('hide');
})
Isuser();
setInterval(init, 1000);