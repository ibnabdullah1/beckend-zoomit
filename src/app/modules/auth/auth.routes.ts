import { Router } from "express";
import auth from "../../middleware/auth";
import clientInfoParser from "../../middleware/clientInfoParser";
import { UserRole } from "../user/user.interface";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", clientInfoParser, AuthController.loginUser);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.USER),
  AuthController.changePassword
);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
