import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Validation for creating a purchase.
 */
export const validatePurchase = [
  body("courseId").notEmpty().withMessage("Course ID is required"),
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
