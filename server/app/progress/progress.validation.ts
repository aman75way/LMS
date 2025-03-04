import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Validation for marking lecture progress.
 */
export const validateProgress = [
  body("courseId").notEmpty().withMessage("Course ID is required"),
  body("lectureId").notEmpty().withMessage("Lecture ID is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
