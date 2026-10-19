 export async function fetchSuggestion() {
     const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent;';

     const api = localStorage.getItem('userAPIkey');
  const response = await fetch( url , {
      method: "POST" ,
      headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": api
      },
      body: JSON.stringify(requestBody);
  })
}