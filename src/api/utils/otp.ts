/**
 * Generate a 6-digit OTP code
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Mock SMS service (replace with real service like Twilio)
 */
export async function sendSMS(phoneNumber: string, message: string): Promise<boolean> {
  console.log(`[MOCK SMS] Sending to ${phoneNumber}: ${message}`);
  
  // In production, replace with actual SMS service:
  // const twilio = require('twilio')(accountSid, authToken);
  // await twilio.messages.create({
  //   body: message,
  //   from: '+1234567890',
  //   to: phoneNumber
  // });
  
  return true;
}

/**
 * Format phone number (basic validation)
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");
  
  // Ensure it starts with country code (assume + is removed)
  if (cleaned.length < 10) {
    throw new Error("Invalid phone number format");
  }
  
  return `+${cleaned}`;
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Basic validation: should be 10-15 digits with optional + prefix
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phoneNumber.replace(/\D/g, ""));
}

