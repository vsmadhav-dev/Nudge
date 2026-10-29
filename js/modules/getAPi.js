export function getAPIkey() {
    let userAPI = prompt(
        'To unlock AI task suggestions, please enter your Gemini API key.\n\n' +
        'Your key is stored securely in your browser\'s localStorage only.\n' +
        'Watch the tutorial or check the guide on how to generate your key: https://docs.gemini.com/rest-api/'
    );

    if(!userAPI || userAPI.trim() === "") {
       window.location.replace('../index.html');
        localStorage.setItem('showApiBanner', 'true');
        return false;
    }
    localStorage.removeItem('showApiBanner');
    userAPI = userAPI.trim();
    localStorage.setItem('userAPIkey', userAPI);
    return true;
}