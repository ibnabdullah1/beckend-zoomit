import { Router } from "express";
import { upload } from "../../middleware/upload";
import { MediaController } from "./media.controller";

const router = Router();

router.get("/", MediaController.listImages);
router.delete("/:name", MediaController.deleteImage);
router.post("/", upload.single("file"), MediaController.uploadImage);

export const MediaRoutes = router;
