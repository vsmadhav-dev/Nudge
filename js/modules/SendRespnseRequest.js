import {requestBody} from "./requestBody.js";

export async function fetchSuggestion(userText) {
     const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent';
    const bodyData = requestBody(userText);
     const api = localStorage.getItem('userAPIkey');
  const response = await fetch( url , {
      method: "POST" ,
      headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": api
      },
      body: JSON.stringify(bodyData)
  });
  try {


      const data = await response.json();
      const rawtext =data.candidates[0].content.parts[0].text;
      const structure =JSON.parse(rawtext)
   console.log(structure[0].answer)
  }catch (e) {
      console.log(e)
  }
}
