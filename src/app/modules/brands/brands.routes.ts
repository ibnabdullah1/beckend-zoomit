import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { BrandsController } from "./brands.controller";
import { BrandValidation } from "./brands.validation";

const router = Router();

router.post(
  "/create",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(BrandValidation.createBrand),
  BrandsController.createBrand
);
router.put(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(BrandValidation.updateBrand),
  BrandsController.updateBrand
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  BrandsController.deleteBrand
);
router.get("", BrandsController.getBrands);
export const BrandRoutes = router;
