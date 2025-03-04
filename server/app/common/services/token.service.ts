import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "./database.service";

/**
 * Generates access and refresh tokens, and stores refresh token in DB.
 */
export const generateTokens = async (userId: string, res: Response) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });

  res.json({ accessToken, refreshToken });
};

/**
 * Clears tokens on logout.
 */
export const clearTokens = async (userId: string, res: Response) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });

  res.json({ message: "Logged out successfully" });
};

/**
 * Refreshes the access token using refresh token from the headers.
 */
export const refreshAccessTokenService = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    // const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "1d" });
    const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    // Store new refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
