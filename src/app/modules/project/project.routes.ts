import { Router } from "express";
import { actionLogger } from "../../middleware/actionLogger";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { ProjectControllers } from "./project.controller";
import { projectValidations } from "./project.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  validateRequest(projectValidations.create),
  ProjectControllers.createProject
);
router.get("/", ProjectControllers.getAllProject);
router.put(
  "/:id",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  validateRequest(projectValidations.update),
  ProjectControllers.updateProject
);
router.get("/:id", ProjectControllers.getSingleProject);
router.delete(
  "/:id",
  actionLogger,
  auth(UserRole.SUPER_ADMIN),
  ProjectControllers.deleteProject
);

export const ProjectRoutes = router;
