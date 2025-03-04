import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

/**
 * Validation rules for user signup.
 */
export const validateUserSignup = [
  body("fullName")
    .notEmpty().withMessage("Full name is required")
    .isString().withMessage("Full name must be a string")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters long"),

  body("email")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),

  body("role")
    .isIn(Object.values(Role)).withMessage("Invalid role. Allowed roles are: STUDENT, INSTRUCTOR, ADMIN"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * Validation rules for user login.
 */
export const validateUserLogin = [
  body("email")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
