
import { ClientOptions, OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const prompt = 'saquarema'
export async function GET() {
  const res = await await openai.images.generate({
    model: "dall-e-2",
    // model: "dall-e-3",
    // prompt: "a white siamese cat",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  // console.log(res)

  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const result = {
    // imageUrl: 'https://litoralguia.com.br/wordpress/wp-content/files/litoralguia.com.br/2021/12/imagem1.png',
    imageUrl: res.data[0].url,
    text: now + ' ' + prompt
  };
  // Directly return the result as a JSON response
  return new Response(JSON.stringify({ data: result }), {
    headers: { 'Content-Type': 'application/json' },
  });
}