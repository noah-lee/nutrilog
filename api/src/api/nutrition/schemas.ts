export const ingestSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  body: {
    type: "object",
    properties: {
      input: { type: "string" },
    },
    required: ["input"],
    additionalProperties: false,
  },
};
