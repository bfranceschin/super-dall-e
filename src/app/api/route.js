
import { OpenAI } from "openai";
import { getRandomParameters, generateDallEPrompt} from '@/utils/prompt'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function GET() {
  // console.log("-----------------------------------------")

  const selectedParameters = getRandomParameters()
  console.log(selectedParameters)

  const prompt = await generateDallEPrompt(selectedParameters)
  // console.log(prompt)

  const res = await await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  // console.log(res)

  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const result = {
    imageUrl: res.data[0].url,
    text: now + ' ' + prompt,
    parameters: selectedParameters,
  };
  // Directly return the result as a JSON response
  return new Response(JSON.stringify({ data: result }), {
    headers: { 'Content-Type': 'application/json' },
  });
}