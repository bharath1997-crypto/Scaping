import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key-change-in-production";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

export interface JWTPayload {
  userId: string;
  email?: string;
  phoneNumber?: string;
  role: string;
}

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY as any,
  });
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRY as any,
  });
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
}

/**
 * Get token expiry date
 */
export function getTokenExpiry(expiresIn: string): Date {
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error("Invalid expiry format");

  const value = parseInt(match[1]);
  const unit = match[2];

  const now = new Date();
  switch (unit) {
    case "s":
      return new Date(now.getTime() + value * 1000);
    case "m":
      return new Date(now.getTime() + value * 60 * 1000);
    case "h":
      return new Date(now.getTime() + value * 60 * 60 * 1000);
    case "d":
      return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
    default:
      throw new Error("Invalid time unit");
  }
}

