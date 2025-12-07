import { PrismaClient } from "@prisma/client";
import type { User, AuthProvider } from "@prisma/client";
import { hashPassword, comparePassword, validatePasswordStrength } from "../utils/password.ts";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, getTokenExpiry } from "../utils/jwt.ts";
import { generateOTP, sendSMS, formatPhoneNumber, isValidPhoneNumber } from "../utils/otp.ts";

const prisma = new PrismaClient();

export interface RegisterEmailInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginEmailInput {
  email: string;
  password: string;
}

export interface RegisterPhoneInput {
  phoneNumber: string;
  name?: string;
}

export interface VerifyOTPInput {
  phoneNumber: string;
  code: string;
  purpose: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email?: string | null;
    phoneNumber?: string | null;
    name?: string | null;
    role: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * Register with email and password
 */
export async function registerWithEmail(input: RegisterEmailInput): Promise<AuthResponse> {
  const { email, password, name } = input;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Validate password strength
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.valid) {
    throw new Error(passwordValidation.message);
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      authProvider: AuthProvider.EMAIL,
      emailVerified: false, // Require email verification
    },
  });

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  // Store refresh token in database
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: getTokenExpiry(process.env.JWT_REFRESH_EXPIRY || "7d"),
    },
  });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Login with email and password
 */
export async function loginWithEmail(input: LoginEmailInput): Promise<AuthResponse> {
  const { email, password } = input;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isValidPassword = await comparePassword(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: getTokenExpiry(process.env.JWT_REFRESH_EXPIRY || "7d"),
    },
  });

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Send OTP to phone number
 */
export async function sendOTPCode(phoneNumber: string, purpose: string): Promise<void> {
  // Format and validate phone number
  if (!isValidPhoneNumber(phoneNumber)) {
    throw new Error("Invalid phone number format");
  }

  const formattedPhone = formatPhoneNumber(phoneNumber);

  // Generate OTP
  const code = generateOTP();

  // Invalidate any existing OTPs for this phone number and purpose
  await prisma.oTPCode.updateMany({
    where: {
      phoneNumber: formattedPhone,
      purpose,
      verified: false,
    },
    data: {
      verified: true, // Mark as used
    },
  });

  // Create new OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await prisma.oTPCode.create({
    data: {
      phoneNumber: formattedPhone,
      code,
      purpose,
      expiresAt,
    },
  });

  // Send SMS
  const message = `Your AppCortex verification code is: ${code}. Valid for 10 minutes.`;
  await sendSMS(formattedPhone, message);
}

/**
 * Verify OTP and register/login user
 */
export async function verifyOTPAndAuth(input: VerifyOTPInput): Promise<AuthResponse> {
  const { phoneNumber, code, purpose } = input;

  // Format phone number
  const formattedPhone = formatPhoneNumber(phoneNumber);

  // Find OTP
  const otpRecord = await prisma.oTPCode.findFirst({
    where: {
      phoneNumber: formattedPhone,
      code,
      purpose,
      verified: false,
      expiresAt: { gte: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otpRecord) {
    // Increment attempts
    await prisma.oTPCode.updateMany({
      where: {
        phoneNumber: formattedPhone,
        purpose,
        verified: false,
      },
      data: {
        attempts: { increment: 1 },
      },
    });

    throw new Error("Invalid or expired OTP code");
  }

  // Mark OTP as verified
  await prisma.oTPCode.update({
    where: { id: otpRecord.id },
    data: { verified: true },
  });

  // Find or create user
  let user = await prisma.user.findUnique({
    where: { phoneNumber: formattedPhone },
  });

  if (!user) {
    // Create new user
    user = await prisma.user.create({
      data: {
        phoneNumber: formattedPhone,
        authProvider: AuthProvider.PHONE,
        phoneVerified: true,
      },
    });
  } else {
    // Update phone verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phoneVerified: true,
        lastLoginAt: new Date(),
      },
    });
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: getTokenExpiry(process.env.JWT_REFRESH_EXPIRY || "7d"),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Google OAuth callback handler
 */
export async function handleGoogleOAuth(profile: any): Promise<AuthResponse> {
  const { id: googleId, emails, displayName, photos } = profile;

  const email = emails?.[0]?.value;
  if (!email) {
    throw new Error("No email provided by Google");
  }

  // Find or create user
  let user = await prisma.user.findFirst({
    where: {
      OR: [{ googleId }, { email }],
    },
  });

  if (!user) {
    // Create new user
    user = await prisma.user.create({
      data: {
        email,
        googleId,
        name: displayName,
        avatar: photos?.[0]?.value,
        authProvider: AuthProvider.GOOGLE,
        emailVerified: true, // Google emails are already verified
      },
    });
  } else if (!user.googleId) {
    // Link Google account to existing user
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        googleId,
        emailVerified: true,
        lastLoginAt: new Date(),
      },
    });
  } else {
    // Update last login
    user = await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: getTokenExpiry(process.env.JWT_REFRESH_EXPIRY || "7d"),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
    },
    accessToken,
    refreshToken,
  };
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(oldRefreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  // Verify refresh token
  const payload = verifyRefreshToken(oldRefreshToken);

  // Check if refresh token exists in database and is not revoked
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { token: oldRefreshToken },
  });

  if (!tokenRecord || tokenRecord.revoked || tokenRecord.expiresAt < new Date()) {
    throw new Error("Invalid or expired refresh token");
  }

  // Revoke old refresh token
  await prisma.refreshToken.update({
    where: { id: tokenRecord.id },
    data: { revoked: true },
  });

  // Get user
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role: user.role,
  });

  // Store new refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: newRefreshToken,
      expiresAt: getTokenExpiry(process.env.JWT_REFRESH_EXPIRY || "7d"),
    },
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

/**
 * Logout user (revoke refresh token)
 */
export async function logout(refreshToken: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { token: refreshToken },
    data: { revoked: true },
  });
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

