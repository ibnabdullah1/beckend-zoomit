import { Router } from "express";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post("/create", ServiceControllers.createService);
router.get("/", ServiceControllers.getAllService);
router.get("/:slug", ServiceControllers.getSingleService);
router.put("/:slug", ServiceControllers.updateSingleService);

export const ServiceRoutes = router;
