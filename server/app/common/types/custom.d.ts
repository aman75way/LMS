import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";