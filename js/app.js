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

let time = document.querySelector("#time");
function init() {
    let timetodisplay = new Date().toLocaleString();
    time.innerText = timetodisplay;
}
Isuser();
setInterval(init, 1000);