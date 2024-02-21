import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async (openai: OpenAI, option: Options) => {
  const {prompt} = option;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
      Hola te seran proveidas una serie de palabras, por favor corrigelas si es necesario. Esto incluye
      errores de ortografía, gramática, puntuación, y otros errores comunes. Si la palabra esta bien.

     Por ultimo debes responder en formato JSON.

     Ejemplo:
     {
      userScore: number,
      erros: string[] // ['error -> solucion'],
      fixedText: string // El mesanje corregido
      message: string // Un mensaje de despedida
     }
      `,
      },
      {role: 'user', content: prompt},
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.2,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  const JSONresponse = JSON.parse(completion.choices[0].message.content);

  return {
    response: JSONresponse,
  };
};
