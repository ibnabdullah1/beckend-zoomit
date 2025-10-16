import { Router } from "express";
import { actionLogger } from "../../middleware/actionLogger";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post(
  "/create-slug",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  ServiceControllers.createSlug
);
router.put(
  "/update-slug/:slug",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  ServiceControllers.updateSlug
);
router.get("/", auth(UserRole.SUPER_ADMIN), ServiceControllers.getAllService);
router.get("/cards", ServiceControllers.getAllServicesForCards);
router.get("/:slug", ServiceControllers.getSingleService);
router.put(
  "/:slug",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  ServiceControllers.updateSingleService
);
router.delete(
  "/:slug",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  ServiceControllers.deleteService
);

export const ServiceRoutes = router;
