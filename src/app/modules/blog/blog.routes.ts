import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BlogControllers } from "./blog.controller";
import { blogValidation } from "./blog.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(blogValidation.create),
  BlogControllers.createBlog
);
router.get("/", BlogControllers.getAllBlogs);
router.get("/:slug", BlogControllers.getBlogBySlug);
router.patch(
  "/:id",
  validateRequest(blogValidation.update),
  BlogControllers.updateBlog
);
router.delete("/:id", BlogControllers.deleteBlog);

export const BlogRoutes = router;
