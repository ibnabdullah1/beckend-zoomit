import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { ProjectControllers } from "./project.controller";
import { projectValidations } from "./project.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(projectValidations.create),
  ProjectControllers.createProject
);
router.get("/", ProjectControllers.getAllProject);
router.put(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(projectValidations.update),
  ProjectControllers.updateProject
);
router.get("/:id", ProjectControllers.getSingleProject);
router.delete("/:id", auth(UserRole.ADMIN), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
