import { User } from "@/api/auth/types";
import { ApiError, ERROR_CODES } from "@/utils/errors";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}

export const handleAuth = (
  request: FastifyRequest,
  _: FastifyReply,
  done: () => void
) => {
  const accessToken = request.cookies.access_token;

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized", ERROR_CODES.UNAUTHORIZED);
  }

  const user = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!
  ) as User;

  request.user = user;
  done();
};
