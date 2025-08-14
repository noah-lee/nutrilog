export const CORS_CONFIG = {
  origin: process.env.CORS_ORIGIN!,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
