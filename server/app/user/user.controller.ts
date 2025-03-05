import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { signupService, loginService, logoutService, getUserService } from "./user.service";
import { refreshAccessTokenService } from "../common/services/token.service";
import { UserDTO } from "./user.dto";

/**
 * Signup handler
 */
export const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, role, password, confirmPassword } = req.body;
  const newUser: UserDTO = await signupService(fullName, email, role, password, confirmPassword, res);
  res.status(201).json(newUser);
});

/**
 * Login handler
 */
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user: Omit<UserDTO, "accessToken" | "refreshToken"> = await loginService(email, password, res);
  res.status(200).json(user);
});

/**
 * Logout handler
 */
export const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user?.id) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  const message = await logoutService(req.user.id, res);
  res.status(200).json({ message });
});

/**
 * Get user profile
 */
export const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user?.id) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }
  const user: Omit<UserDTO, "accessToken" | "refreshToken"> = await getUserService(req.user.id);
  res.status(200).json(user);
});

/**
 * Refresh Access Token Handler
 */
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await refreshAccessTokenService(req, res);
});
