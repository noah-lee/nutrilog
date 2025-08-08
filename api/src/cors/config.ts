console.log("process.env.CORS_ORIGIN", process.env.CORS_ORIGIN);

export const CORS_CONFIG = {
  origin: process.env.CORS_ORIGIN!,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
