import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../utils/openai";

type Body = {
  prompt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as Body;

  const prompt = generatePrompt(data);

  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: [":"],
  });

  console.log("response", response.data);

  res.status(200).json({ result: response.data.choices[0].text });
}

function generatePrompt(data: Body) {
  const prompt = `
  Generate a linux command using the following requirements.
  Requirements: A linux command that ${data.prompt}
  Result:
  `;
  return prompt;
}
