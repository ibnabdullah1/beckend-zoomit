import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middleware/auth";
import { parseBody } from "../../middleware/bodyParser";
import clientInfoParser from "../../middleware/clientInfoParser";
import validateRequest from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserRole } from "./user.interface";
import { UserValidation } from "./user.validation";

const router = Router();

router.get("/", auth(UserRole.SUPER_ADMIN), UserController.getAllUser);

router.get(
  "/me",
  auth(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.EDITOR,
    UserRole.USER,
    UserRole.PUBLISHER
  ),
  UserController.myProfile
);

router.post(
  "/",
  clientInfoParser,
  validateRequest(UserValidation.userValidationSchema),
  UserController.registerUser
);
// update profile
router.patch(
  "/update-profile",
  auth(UserRole.USER),
  multerUpload.single("profilePhoto"),
  parseBody,
  validateRequest(UserValidation.customerInfoValidationSchema),
  UserController.updateProfile
);

router.patch(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN),
  UserController.updateUserStatus
);

export const UserRoutes = router;
