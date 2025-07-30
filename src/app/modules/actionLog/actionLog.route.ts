import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { ActionLogControllers } from "./actionLog.controller";

const router = express.Router();
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN),
  ActionLogControllers.getAllActionLogs
);

export const ActionLogRoutes = router;
