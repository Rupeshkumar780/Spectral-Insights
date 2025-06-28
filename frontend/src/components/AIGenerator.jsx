import { useState } from "react";
import axios from "axios";
import AI_IMAGE from "../assets/AI.png";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function AIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateText = async () => {
    setLoading(true);
    setGeneratedText("");
    setError("");

    if (!prompt.trim()) {
      setError("Please enter a prompt to generate text.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/ai/generate`,
        { prompt }
      );
      setGeneratedText(response.data.generatedText);
    } catch (err) {
      console.error("Error fetching AI generated text:", err);
      setError(
        err.response?.data?.message ||
          "Failed to generate text. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen flex flex-col justify-center mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl flex justify-center font-bold text-gray-800 mb-6 text-center">
        <img
          src={AI_IMAGE}
          alt="Gemini"
          className="w-8 h-8 rounded-full mr-3 mt-1"
        />
        AI Text Generator
      </h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <label
          htmlFor="promptInput"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Enter your prompt:
        </label>
        <textarea
          id="promptInput"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          rows="6"
          placeholder="e.g., Write a short blog post under Lifestyle & Wellness on 'The Art of Staying Consistent in a Distracted World.'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <button
          onClick={handleGenerateText}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out "
        >
          {loading ? "Generating..." : "Generate Text"}
        </button>

        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">{error}</p>
        )}
      </div>

      {generatedText && (
        <div className="bg-white my-15 shadow-2xl rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Generated Content:
          </h3>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-gray-300 border border-gray-400 rounded-md text-gray-700  ">
            {generatedText}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIGenerator;
