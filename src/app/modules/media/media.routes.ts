import { Router } from "express";
import { upload } from "../../middleware/upload";
import { MediaControllers } from "./media.controller";

const router = Router();

router.get("/", MediaControllers.listImages);
router.delete("/:name", MediaControllers.deleteImage);
router.post("/", upload.single("file"), MediaControllers.uploadImage);
router.patch("/rename", MediaControllers.renameImage);
export const MediaRoutes = router;
