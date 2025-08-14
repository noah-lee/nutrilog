import { ProviderUser } from "@/oauth/types";
import { isProviderUser } from "@/oauth/utils";
import { ApiError, ERROR_CODES } from "@/utils/errors";
import dotenv from "dotenv";
dotenv.config();

export const getGoogleAccessToken = async (code: string): Promise<string> => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ApiError(
      response.status,
      `Google OAuth error: ${response.status} - ${errorBody}`,
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  const { access_token } = await response.json();

  if (!access_token || typeof access_token !== "string") {
    throw new ApiError(
      502,
      "Failed to retrieve valid access token from Google OAuth.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  return access_token;
};

export const getGoogleUserInfo = async (googleToken: string) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new ApiError(
      response.status,
      `Google User info error: ${response.status} - ${errorBody}`,
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  const user = await response.json();

  if (!user || user.verified || !isProviderUser(user)) {
    throw new ApiError(
      502,
      "Failed to retrieve valid user information from Google OAuth.",
      ERROR_CODES.EXTERNAL_API_ERROR
    );
  }

  return { email: user.email, name: user.name } as ProviderUser;
};
