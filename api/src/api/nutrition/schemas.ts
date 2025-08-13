export const ingestSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  body: {
    type: "object",
    properties: {
      prompt: { type: "string" },
      biometrics: {
        type: "object",
        properties: {
          sex: { type: "string", enum: ["male", "female", "other"] },
          age: { type: "number" },
          weight: { type: "number" },
          height: { type: "number" },
        },
        required: ["sex", "age", "weight", "height"],
      },
      start: { type: "string", format: "date-time" },
      end: { type: "string", format: "date-time" },
    },
    required: ["prompt", "biometrics"],
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
