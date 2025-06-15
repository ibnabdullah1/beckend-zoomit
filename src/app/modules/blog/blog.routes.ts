import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { BlogControllers } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.ADMIN),
  validateRequest(BlogValidation.create),
  BlogControllers.createBlog
);
router.get("/", BlogControllers.getAllBlogs);
router.get("/:slug", BlogControllers.getSingleBlog);
router.patch(
  "/:slug",
  auth(UserRole.ADMIN),
  validateRequest(BlogValidation.update),
  BlogControllers.updateBlog
);
router.delete("/:slug", auth(UserRole.ADMIN), BlogControllers.deleteBlog);

export const BlogRoutes = router;
