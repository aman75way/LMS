import bcryptjs from "bcryptjs";
import prisma from "../common/services/database.service";
import { generateTokens, clearTokens } from "../common/services/token.service";
import { UserDTO } from "./user.dto";
import { Role } from "@prisma/client";

/**
 * Creates a new user and generates tokens.
 */
export const signupService = async (
  fullName: string,
  email: string,
  role: string,
  password: string,
  confirmPassword: string,
  res: any
): Promise<UserDTO> => {
  if (!fullName || !email || !password || !confirmPassword || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (!Object.values(Role).includes(role as Role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role: role as Role,
      refreshToken: null,
    },
  });

  await generateTokens(newUser.id, res);

  return {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt.toISOString(),
    updatedAt: newUser.updatedAt.toISOString(),
  };
};

/**
 * Authenticates a user using email and password.
 */
export const loginService = async (email: string, password: string, res: any): Promise<UserDTO> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcryptjs.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  await generateTokens(user.id, res);

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

/**
 * Logs out a user by clearing tokens.
 */
export const logoutService = async (userId: string, res: any) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });

  await clearTokens(userId, res);
  return { message: "Logged out successfully" };
};

/**
 * Retrieves a user's details.
 */
export const getUserService = async (userId: string): Promise<UserDTO> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};
