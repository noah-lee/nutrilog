import dotenv from "dotenv";
dotenv.config();

export const LLM_API_KEY = process.env.GROQ_API_KEY;

export const COMPLETION_API_URL = "https://api.groq.com/openai/v1/chat/completions";