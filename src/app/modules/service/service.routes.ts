import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post("/create", auth(UserRole.ADMIN), ServiceControllers.createService);
router.post(
  "/draft",
  auth(UserRole.ADMIN),
  ServiceControllers.saveDraftService
);
router.get(
  "/draft/:id",
  auth(UserRole.ADMIN),
  ServiceControllers.singleDraftService
);
router.put(
  "/draft/:id",
  auth(UserRole.ADMIN),
  ServiceControllers.updateDraftSingleService
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
