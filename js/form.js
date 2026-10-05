let form = document.querySelector('.auth-form');
let name = document.querySelector('.form-input');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
   const userName = name.value.trim().toLowerCase();
   localStorage.setItem('userName',userName);
    window.location.replace('../index.html');
});
