import { JwtPayload, sign, verify } from "jsonwebtoken";

export function signAccessTokenFor(userId: string) {
  const accessToken = sign(
    {
      sub: userId,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return accessToken;
}

export function validateAccessToken(token: string) {
  try {
    const { sub } = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return sub ?? null;
  } catch {
    return null;
  }
}
