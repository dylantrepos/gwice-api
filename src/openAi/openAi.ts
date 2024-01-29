import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const responseTEst = async () => {
  const res = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      {
        "role": "user",
        "content": "read this html. Return only JSON. fields: title, date, description, price, location, image source"
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log('res', res.choices[0].message);
} 

type GetPrompt = {
  content: string;
}

export const getPrompt = async ({ content }: GetPrompt) => {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        "role": "system",
        "content": "Extract event information from the provided HTML: Generate the event information in JSON format only (no text) for those fields only (don't create other) :- title- date (timestamp format, start: nearest date time found, end: far date time found)- description (keep all the description part, rewrite if needed, add \\n to jump line for readibility)- price (if price is too long, could be labeled tarif in page, if multiple, keep lowest)- location (name, address, no map field)- website - contact (if exists)- access (if exists)html content"
      },
      {
        "role": "user",
        "content": content
      }
    ],
    response_format: {
      "type": "json_object"
    },
    temperature: 1,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return res;
} 