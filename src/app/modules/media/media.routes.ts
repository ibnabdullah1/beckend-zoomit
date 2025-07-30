import { Router } from "express";
import { actionLogger } from "../../middleware/actionLogger";
import auth from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import { UserRole } from "../user/user.interface";
import { MediaControllers } from "./media.controller";

const router = Router();

router.get("/", auth(UserRole.SUPER_ADMIN), MediaControllers.listImages);
router.delete(
  "/:name",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  MediaControllers.deleteImage
);
router.post(
  "/",
  auth(UserRole.SUPER_ADMIN),
  upload.single("file"),
  actionLogger,
  MediaControllers.uploadImage
);
router.patch(
  "/rename",
  actionLogger,
  auth(UserRole.SUPER_ADMIN),
  MediaControllers.renameImage
);
export const MediaRoutes = router;
