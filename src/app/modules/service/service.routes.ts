import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post(
  "/create-slug",
  auth(UserRole.ADMIN),
  ServiceControllers.createSlug
);
router.put(
  "/update-slug/:slug",
  auth(UserRole.ADMIN),
  ServiceControllers.updateSlug
);
router.get("/", auth(UserRole.ADMIN), ServiceControllers.getAllService);
router.get("/:slug", ServiceControllers.getSingleService);
router.put(
  "/:slug",
  auth(UserRole.ADMIN),
  ServiceControllers.updateSingleService
);
router.delete("/:id", auth(UserRole.ADMIN), ServiceControllers.deleteService);

export const ServiceRoutes = router;
