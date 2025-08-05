export const ingestSchema = {
  body: {
    type: "object",
    required: ["input"],
    properties: {
      input: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        foods: {
          type: "array",
          items: {
            type: "object",
            required: ["description", "calories", "protein"],
            properties: {
              description: { type: "string" },
              calories: { type: "number" },
              protein: { type: "number" },
            },
          },
        },
        activities: {
          type: "array",
          items: {
            type: "object",
            required: ["description", "calories"],
            properties: {
              description: { type: "string" },
              calories: { type: "number" },
            },
          },
        },
        feedback: { type: "string" },
      },
    },
  },
};
