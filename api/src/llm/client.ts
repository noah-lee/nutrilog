import { ApiError, ERROR_CODES } from "@/utils/errors";

export const getCompletion = async (
  messages: { role: string; content: string }[],
  model = "openai/gpt-oss-20b",
  temperature = 0,
  maxTokens = 1024
) => {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages,
        temperature: temperature,
        max_tokens: maxTokens,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ApiError(
      response.status,
      `LLM API error: ${response.status} - ${errorBody}`,
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  const { choices } = await response.json();

  const content = choices?.[0]?.message?.content;
  if (!content) {
    throw new ApiError(
      502,
      "No content returned from LLM response.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  try {
    return JSON.parse(content) as unknown;
  } catch (err) {
    throw new ApiError(
      502,
      "Failed to parse LLM JSON response.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }
};
