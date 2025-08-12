export const ingestSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  body: {
    type: "object",
    properties: {
      input: { type: "string" },
    },
    required: ["input"],
  },
};

export const startEndQueryStringSchema = {
  type: "object",
  properties: {
    start: { type: "string", format: "date-time" },
    end: { type: "string", format: "date-time" },
  },
  required: [],
};
