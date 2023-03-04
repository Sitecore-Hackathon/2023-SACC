import { Configuration, OpenAIApi } from 'openai';

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
  private readonly configuration: Configuration;
  private readonly openai: OpenAIApi;

  constructor(apiKey: string) {
    this.configuration = new Configuration({ apiKey: apiKey });
    this.openai = new OpenAIApi(this.configuration);
  }

  async query(prompt: string): Promise<string | undefined> {
    const response = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 2000,
      stop: ['\n'],
      n: 1,
    });

    return response.data.choices[0].text;
  }
}
