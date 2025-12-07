import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JWTPayload } from "../utils/jwt.ts";

// Extend Express Request to include auth user
export interface AuthRequest extends Request {
  authUser?: JWTPayload;
}

declare global {
  namespace Express {
    interface Request {
      authUser?: JWTPayload;
    }
  }
}

/**
 * Middleware to verify JWT token
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const payload = verifyAccessToken(token);

    req.authUser = payload;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid token",
    });
  }
}

/**
 * Middleware to check if user has specific role
 */
export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.authUser.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - insufficient permissions",
      });
    }

    next();
  };
}

/**
 * Optional authentication - sets user if token is valid but doesn't require it
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);
      req.authUser = payload;
    }
  } catch (error) {
    // Silently fail - token is optional
  }

  next();
}

