import jwt from "jsonwebtoken";

export function JWTSign(
  payload: string | object | Buffer,
  options?: jwt.SignOptions
): string {
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}
