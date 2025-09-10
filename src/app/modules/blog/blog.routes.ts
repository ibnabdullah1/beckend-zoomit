import express from "express";
import { actionLogger } from "../../middleware/actionLogger";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { BlogControllers } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  actionLogger,
  validateRequest(BlogValidation.create),
  BlogControllers.createBlog
);
router.get("/", BlogControllers.getAllBlogs);
router.get("/:slug", BlogControllers.getSingleBlog);
router.patch(
  "/:slug",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  validateRequest(BlogValidation.update),
  BlogControllers.updateBlog
);
router.delete(
  "/:slug",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  BlogControllers.deleteBlog
);

export const BlogRoutes = router;
