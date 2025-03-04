import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Validation for creating a lecture.
 */
export const validateLecture = [
  body("courseId").notEmpty().withMessage("Course ID is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("contentUrl").isURL().withMessage("Valid content URL is required"),
  body("duration").isInt({ gt: 0 }).withMessage("Duration must be a positive integer"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
