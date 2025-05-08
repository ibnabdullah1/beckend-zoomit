import { Router } from "express";
import { upload } from "../../middleware/upload";
import { ServiceControllers } from "./service.controller";

const router = Router();

router.post("/create", upload.any(), ServiceControllers.createService);

export const ServiceRoutes = router;
