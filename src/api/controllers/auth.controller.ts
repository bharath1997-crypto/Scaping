import { Request, Response } from "express";
import * as authService from "../services/auth.service.ts";

/**
 * Register with email and password
 * POST /api/v1/auth/register
 */
export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.registerWithEmail({ email, password, name });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
}

/**
 * Login with email and password
 * POST /api/v1/auth/login
 */
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.loginWithEmail({ email, password });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
}

/**
 * Send OTP to phone number
 * POST /api/v1/auth/send-otp
 */
export async function sendOTP(req: Request, res: Response) {
  try {
    const { phoneNumber, purpose } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const validPurposes = ["SIGNUP", "LOGIN", "VERIFY_PHONE"];
    const otpPurpose = purpose || "LOGIN";

    if (!validPurposes.includes(otpPurpose)) {
      return res.status(400).json({
        success: false,
        message: "Invalid purpose. Must be SIGNUP, LOGIN, or VERIFY_PHONE",
      });
    }

    await authService.sendOTPCode(phoneNumber, otpPurpose);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to send OTP",
    });
  }
}

/**
 * Verify OTP and login/register
 * POST /api/v1/auth/verify-otp
 */
export async function verifyOTP(req: Request, res: Response) {
  try {
    const { phoneNumber, code, purpose } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({
        success: false,
        message: "Phone number and code are required",
      });
    }

    const otpPurpose = purpose || "LOGIN";
    const result = await authService.verifyOTPAndAuth({ phoneNumber, code, purpose: otpPurpose });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "OTP verification failed",
    });
  }
}

/**
 * Refresh access token
 * POST /api/v1/auth/refresh
 */
export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Token refresh failed",
    });
  }
}

/**
 * Logout user
 * POST /api/v1/auth/logout
 */
export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    await authService.logout(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Logout failed",
    });
  }
}

/**
 * Get current user profile
 * GET /api/v1/auth/me
 */
export async function getMe(req: Request, res: Response) {
  try {
    if (!req.authUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await authService.getUserById(req.authUser.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user profile",
    });
  }
}

