import { ApiError, ERROR_CODES } from "@/utils/errors";
import {
  OPENAI_API_KEY,
  OPENAI_COMPLETIONS_API_URL,
  OPENAI_EMBEDDINGS_API_URL,
} from "./config";

export const createEmbedding = async (input: string) => {
  const response = await fetch(OPENAI_EMBEDDINGS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input,
      model: "text-embedding-ada-002",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Failed to create embedding:", error);
    throw new Error("Failed to create embedding");
  }

  const { data } = await response.json();

  const embedding = data?.[0]?.embedding;

  if (!embedding) {
    throw new ApiError(
      502,
      "No embedding returned from OpenAI response.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  const isValidEmbedding =
    Array.isArray(embedding) &&
    embedding.every((item: unknown) => typeof item === "number");

  if (!isValidEmbedding) {
    throw new ApiError(
      502,
      "Invalid embedding format from OpenAI.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  try {
    const stringifiedEmbedding = JSON.stringify(embedding);
    return stringifiedEmbedding;
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to stringify embedding from OpenAI.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }
};

export const getCompletion = async (
  messages: { role: string; content: string }[],
  model = "gpt-4.1-nano",
  temperature = 0,
  maxTokens = 1000
) => {
  const response = await fetch(OPENAI_COMPLETIONS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages,
      temperature: temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ApiError(
      response.status === 401 ? 401 : 503,
      `OpenAI API error: ${response.status} - ${errorBody}`,
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  const { choices } = await response.json();

  const content = choices?.[0]?.message?.content;
  if (!content) {
    throw new ApiError(
      502,
      "No content returned from OpenAI response.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  console.log("---");
  console.log("content: ", content);
  console.log("---");

  try {
    const parsedContent = JSON.parse(content);

    return parsedContent as unknown;
  } catch (err) {
    throw new ApiError(
      502,
      "Failed to parse OpenAI JSON response.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }
};
