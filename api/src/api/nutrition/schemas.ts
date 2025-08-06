export const ingestSchema = {
  body: {
    type: "object",
    required: ["input"],
    properties: {
      input: { type: "string" },
    },
  },
};
