import { Router } from "express";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post("/create", ServiceControllers.createService);
router.post("/draft", ServiceControllers.saveDraftService);
router.get("/draft/:id", ServiceControllers.singleDraftService);
router.put("/draft/:id", ServiceControllers.updateDraftSingleService);
router.get("/", ServiceControllers.getAllService);
router.get("/:slug", ServiceControllers.getSingleService);
router.put("/:slug", ServiceControllers.updateSingleService);
router.delete("/:id", ServiceControllers.deleteService);

export const ServiceRoutes = router;
