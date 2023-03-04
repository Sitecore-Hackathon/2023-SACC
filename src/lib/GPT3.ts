import * as openai from 'openai';

/**
 * GPT3 class
 * @class
 * @classdesc GPT3 class
 * @param {string} apiKey - OpenAI API key
 * @returns {GPT3} GPT3 instance
 * @example
 * const gpt3 = new GPT3("YOUR_API_KEY_HERE");
 * const prompt = "What is the meaning of life?";
 * const response = await gpt3.query(prompt);
 * console.log(response); // "The meaning of life is..."
 * 
 */

export class GPT3 {
  private readonly API_KEY: string;

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
    openai.apiKey = apiKey;
  }

  async query(prompt: string, model: string = "text-davinci-002", maxTokens: number = 2000): Promise<string> {
    const params: openai.CompletionParams = {
      prompt: prompt,
      model: model,
      maxTokens: maxTokens,
      n: 1,
      stop: "\n",
    };
    const response = await openai.completions.create(params);
    return response.choices[0].text.trim();
  }
}