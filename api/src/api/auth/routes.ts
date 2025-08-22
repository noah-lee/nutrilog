import { handleGoogleCallbackService } from "@/api/auth/services";
import { ApiError, ERROR_CODES } from "@/utils/errors";
import { FastifyInstance } from "fastify";

const authRoutes = (fastify: FastifyInstance) => {
  fastify.get("/google", async (_, reply) => {
    return reply.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env
        .GOOGLE_CLIENT_ID!}&redirect_uri=${process.env
        .GOOGLE_REDIRECT_URI!}&response_type=code&scope=openid%20email%20profile`
    );
  });

  fastify.get<{ Querystring: { code: string } }>(
    "/google/callback",
    async (request, reply) => {
      const { code } = request.query;

      if (!code) {
        throw new ApiError(
          502,
          "Google OAuth callback failed",
          ERROR_CODES.EXTERNAL_API_ERROR
        );
      }

      const accessToken = await handleGoogleCallbackService(code);

      reply.setCookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api",
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      });

      return reply.redirect(process.env.CORS_ORIGIN!);
    }
  );

  fastify.post("/signout", async (_, reply) => {
    reply.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api",
    });

    return reply.status(200).send();
  });
};

export default authRoutes;
