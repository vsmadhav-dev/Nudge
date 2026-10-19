import {text} from "./suggestion.js";

export const requestBody = {
    contents: [
        {
            parts: [
                {
                    text: text
                }
            ]
        }
    ],
    generationConfig:{
     responseMimeType: "application/json" ,
        responseSchema:{
         type: "array" ,
            items: {
             type: "object" ,
                properties:{
                 answer:{
                     type: "string",
                     description: "The answer to the question"
                 }
            } ,
            required: ['answer']
            }
        }
    }
};