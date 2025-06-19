import { Router } from "express";
import auth from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import { UserRole } from "../user/user.interface";
import { MediaControllers } from "./media.controller";

const router = Router();

router.get("/", auth(UserRole.ADMIN), MediaControllers.listImages);
router.delete("/:name", auth(UserRole.ADMIN), MediaControllers.deleteImage);
router.post(
  "/",
  auth(UserRole.ADMIN),
  upload.single("file"),
  MediaControllers.uploadImage
);
router.patch("/rename", auth(UserRole.ADMIN), MediaControllers.renameImage);
export const MediaRoutes = router;
