
export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const data = await res.json()

  const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const result = {
    imageUrl: 'https://litoralguia.com.br/wordpress/wp-content/files/litoralguia.com.br/2021/12/imagem1.png',
    text: now + ' imagem aleatória de saquarema '
  };
  // Directly return the result as a JSON response
  return new Response(JSON.stringify({ data: result }), {
    headers: { 'Content-Type': 'application/json' },
  });
}