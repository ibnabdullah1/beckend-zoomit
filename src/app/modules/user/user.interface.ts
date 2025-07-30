import { Document, Model } from "mongoose";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  EDITOR = "editor",
  PUBLISHER = "publisher",
  USER = "user",
}

// User Schema Definition
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  profilePhoto?: string;
  clientInfo: {
    device: string;
    browser: string;
    ipAddress: string;
    pcName?: string;
    os?: string;
    userAgent?: string;
  };
  lastLogin: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}
