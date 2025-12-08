import { Router } from "express";
import * as contactController from "../controllers/contact.controller.ts";

const router = Router();

/**
 * POST /api/v1/contact
 * Submit contact form
 */
router.post("/", contactController.submitContact);

export default router;

