import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export interface AuthResponse {
  success: boolean;
  data?: {
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
  };
  message?: string;
}

export interface User {
  id: string;
  email?: string | null;
  phoneNumber?: string | null;
  name?: string | null;
  avatar?: string | null;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
}

/**
 * Register with email and password
 */
export async function registerWithEmail(email: string, password: string, name?: string): Promise<AuthResponse> {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
    name,
  });
  return response.data;
}

/**
 * Login with email and password
 */
export async function loginWithEmail(email: string, password: string): Promise<AuthResponse> {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

/**
 * Send OTP to phone number
 */
export async function sendOTP(phoneNumber: string, purpose: "SIGNUP" | "LOGIN" | "VERIFY_PHONE" = "LOGIN"): Promise<{ success: boolean; message: string }> {
  const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
    phoneNumber,
    purpose,
  });
  return response.data;
}

/**
 * Verify OTP
 */
export async function verifyOTP(phoneNumber: string, code: string, purpose: string = "LOGIN"): Promise<AuthResponse> {
  const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
    phoneNumber,
    code,
    purpose,
  });
  return response.data;
}

/**
 * Refresh access token
 */
export async function refreshToken(refreshToken: string): Promise<{ success: boolean; data: { accessToken: string; refreshToken: string } }> {
  const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
    refreshToken,
  });
  return response.data;
}

/**
 * Logout
 */
export async function logout(refreshToken: string): Promise<{ success: boolean; message: string }> {
  const response = await axios.post(`${API_BASE_URL}/auth/logout`, {
    refreshToken,
  });
  return response.data;
}

/**
 * Get current user
 */
export async function getCurrentUser(accessToken: string): Promise<{ success: boolean; data: User }> {
  const response = await axios.get(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

/**
 * Initialize Google OAuth
 */
export function initGoogleOAuth(): void {
  // Ensure we use the full backend URL (not relative)
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
  const googleAuthUrl = `${backendUrl}/auth/google`;
  
  console.log("Redirecting to Google OAuth:", googleAuthUrl);
  // Redirect to backend - if Google OAuth is not configured, backend will return 503 error
  window.location.href = googleAuthUrl;
}

/**
 * Store tokens in localStorage
 */
export function storeAuthTokens(accessToken: string, refreshToken: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
}

/**
 * Get stored tokens
 */
export function getStoredTokens(): { accessToken: string | null; refreshToken: string | null } {
  if (typeof window !== "undefined") {
    return {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  }
  return { accessToken: null, refreshToken: null };
}

/**
 * Clear stored tokens
 */
export function clearAuthTokens(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

/**
 * Request password reset email
 */
export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
    email,
  });
  return response.data;
}

/**
 * Verify reset password token
 */
export async function verifyResetToken(token: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/verify-reset-token`, {
      params: { token },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.status === 400) {
      return { success: false, message: error.response?.data?.message || 'Invalid or expired token' };
    }
    throw error;
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
  const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
    token,
    password,
  });
  return response.data;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const { accessToken } = getStoredTokens();
  return !!accessToken;
}

