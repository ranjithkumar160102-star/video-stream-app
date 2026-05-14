import { GoogleGenerativeAI } from "@google/generative-ai";
import { CONFIG } from "../config";

const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);

export const GeminiService = {
  classifyVideo: async (title, description) => {
    try {
      if (!CONFIG.GEMINI_API_KEY) {
        console.warn("Gemini API Key missing. Returning mock classification.");
        return {
          category: "Technology",
          tags: ["Tech", "Education"],
          confidence: 0.95
        };
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `
        Analyze the following video metadata and classify it into one of these categories: Education, Music, Comedy, Gaming, News, Vlog.
        Also provide a few relevant tags.
        
        Video Title: ${title}
        Video Description: ${description}
        
        Return the result strictly as a JSON object:
        {
          "category": "string",
          "tags": ["string", "string"],
          "confidence": number
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response (Gemini sometimes wraps in markdown)
      const jsonMatch = text.match(/\{.*\}/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error("Invalid AI response");
    } catch (error) {
      console.error("AI Classification failed:", error);
      return {
        category: "General",
        tags: ["Entertainment"],
        confidence: 0.5
      };
    }
  }
};