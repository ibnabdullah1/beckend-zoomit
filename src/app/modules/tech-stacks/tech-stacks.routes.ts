import { Router } from "express";
import { techStacksController } from "./tech-stacks.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { techStacksValidation } from "./tech-stacks.validation";
import validateRequest from "../../middleware/validateRequest";

const techStackRouters = Router();

// Routes
techStackRouters.get("/", techStacksController.getAllTechStacks);

techStackRouters.post(
    "/",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(techStacksValidation.createTechStack),
    techStacksController.createTechStack
);

techStackRouters.put(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(techStacksValidation.createTechStack),
    techStacksController.updateTechStack
);

techStackRouters.delete(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    techStacksController.deleteTechStack
);

export default techStackRouters;
