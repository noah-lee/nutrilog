import { getOrInsertUser } from "@/api/profile/repositories";
import { getGoogleAccessToken, getGoogleUserInfo } from "@/oauth/client";
import jwt from "jsonwebtoken";

export const handleGoogleCallbackService = async (code: string) => {
  const googleToken = await getGoogleAccessToken(code);

  const providerUser = await getGoogleUserInfo(googleToken);

  const user = await getOrInsertUser(providerUser);

  const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "24h",
  });
  
  return accessToken;
};
