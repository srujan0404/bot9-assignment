const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatResponse(messages, functions) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613", 
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for hotel bookings.",
        },
        ...messages,
      ],
      functions: functions,
      function_call: "auto",
    });

    // console.log("API Response:", JSON.stringify(completion, null, 2));

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No choices returned from the API");
    }

    return completion.choices[0].message;
  } catch (error) {
    console.error("Error getting chat response:", error);

    if (error.response) {
      console.error("API Error Response:", error.response.data);
    }

    throw error;
  }
}

module.exports = { getChatResponse };
