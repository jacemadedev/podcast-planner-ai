import { Content } from '../types';
import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('VITE_OPENAI_API_KEY is not set in the environment variables.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export const aiService = {
  analyzeContent: async (content: Content): Promise<string> => {
    if (!apiKey) {
      return "OpenAI API key is not set. Please check your environment variables.";
    }
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that analyzes content for podcasts." },
          { role: "user", content: `Analyze this content for a podcast: "${content.text}"` }
        ],
      });
      return response.choices[0].message.content || "No analysis available.";
    } catch (error) {
      console.error('Error analyzing content:', error);
      return "Error occurred during analysis.";
    }
  },

  generateScript: async (contents: Content[]): Promise<string> => {
    if (!apiKey) {
      return "OpenAI API key is not set. Please check your environment variables.";
    }
    try {
      const contentTexts = contents.map(c => c.text).join("\n");
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates podcast scripts." },
          { role: "user", content: `Generate a podcast script outline based on these topics:\n${contentTexts}` }
        ],
      });
      return response.choices[0].message.content || "No script generated.";
    } catch (error) {
      console.error('Error generating script:', error);
      return "Error occurred during script generation.";
    }
  },
};