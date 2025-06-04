import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generates text based on a given prompt using the Gemini 2.0 Flash model.
 * param {string} prompt The user's input prompt for text generation.
 * returns {Promise<string>} A promise that resolves to the generated text.
 * throws {Error} If the API key is missing or if the API call fails.
 */

const generateText = async (prompt) => {
    console.log("Gemini", API_KEY);
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text;
    } catch (error) {
        console.error("Error generating text with Gemini API:", error);
        throw new Error("Failed to generate text. Please try again later.");
    }
};

export default generateText;
