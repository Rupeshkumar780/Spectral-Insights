import express from "express";
import generateText from "../service/aiService.js";

const router = express.Router();

/**
 * route POST /api/ai/generate
 * description Generates text based on a user prompt using the AI service.
 * access Public (or Private, depending on your auth setup)
 */

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res
      .status(400)
      .json({ message: "Prompt is required and must be a non-empty string." });
  }

  try {
    const generatedContent = await generateText(prompt);
    res.status(200).json({ success: true, generatedText: generatedContent });
  } catch (error) {
    console.error("Error in /api/ai/generate route:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "Server error during text generation.",
      });
  }
});

export default router;
