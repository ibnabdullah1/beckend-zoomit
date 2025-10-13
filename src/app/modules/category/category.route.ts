import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategories);
router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryController.updateCategory
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
