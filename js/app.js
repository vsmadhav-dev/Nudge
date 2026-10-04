let time = document.querySelector("#time");
function init() {
    let timetodisplay = new Date().toLocaleString();
    time.innerText = timetodisplay;
}
setInterval(init, 1000);