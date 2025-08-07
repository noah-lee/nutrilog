export const updateFoodLogSchema = {
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
      protein: { type: "number" },
    },
    anyOf: [
      { required: ["description"] },
      { required: ["calories"] },
      { required: ["protein"] },
    ],
    additionalProperties: false,
  },
};

export const deleteFoodLogSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },

};
