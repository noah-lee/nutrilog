export const ingestSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  body: {
    type: "object",
    properties: {
      prompt: { type: "string" },
      start: { type: "string", format: "date-time" },
      end: { type: "string", format: "date-time" },
    },
    required: ["prompt"],
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
