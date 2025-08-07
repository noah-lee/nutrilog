export const updateActivityLogSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      description: { type: "string" },
      calories: { type: "number" },
    },
    anyOf: [
      { required: ["description"] },
      { required: ["calories"] },
    ],
    additionalProperties: false,
  },
};

export const deleteActivityLogSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
};
