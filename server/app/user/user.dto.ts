import { Role } from "@prisma/client";
import { BaseSchema } from "../common/dto/base.dto";

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
