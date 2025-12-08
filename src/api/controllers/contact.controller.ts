import { Request, Response } from "express";

/**
 * POST /api/v1/contact
 * Submit contact form
 */
export async function submitContact(req: Request, res: Response) {
  try {
    const { name, email, company, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // TODO: Send email notification to support team
    // TODO: Save to database for tracking
    // TODO: Send auto-reply to user

    console.log("Contact form submission:", {
      name,
      email,
      company,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    res.json({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
    });
  } catch (error: any) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit contact form",
    });
  }
}

