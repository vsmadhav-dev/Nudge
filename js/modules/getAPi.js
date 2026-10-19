export function getAPIkey() {
    let userAPI = prompt(
        'To unlock AI task suggestions, please enter your Gemini API key.\n\n' +
        'Your key is stored securely in your browser\'s localStorage only.\n' +
        'Watch the tutorial or check the guide on how to generate your key: https://docs.gemini.com/rest-api/'
    );

    while (!userAPI || userAPI.trim() === "") {
        userAPI = prompt(
            'A valid Gemini API key is required to use AI features.\n\n' +
            'Please enter your key (Learn how to generate one here: https://docs.gemini.com/rest-api/):'
        );
    }

    userAPI = userAPI.trim();
    localStorage.setItem('userAPIkey', userAPI);
    return true;
}