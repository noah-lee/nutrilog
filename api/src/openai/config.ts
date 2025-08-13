import dotenv from "dotenv";
dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const OPENAI_COMPLETIONS_API_URL = "https://api.openai.com/v1/chat/completions";

export const OPENAI_EMBEDDINGS_API_URL = "https://api.openai.com/v1/embeddings";
