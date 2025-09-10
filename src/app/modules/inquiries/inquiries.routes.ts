import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { UserRole } from "../user/user.interface";
import { inquiriesController } from "./inquiries.controller";
import { inquiriesValidation } from "./inquiries.validation";

const router = Router();

// Define routes
router.post(
  "/contact",
  validateRequest(inquiriesValidation.createContactMessage),
  inquiriesController.createContactMessage
);
router.post(
  "/quotation",
  validateRequest(inquiriesValidation.createQuotationRequest),
  inquiriesController.createQuotationRequest
);
router.get(
  "/all-contact",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  inquiriesController.allContactMessage
);
router.get(
  "/all-quotation",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  inquiriesController.allQuotationRequest
);
export const InquiriesRoutes = router;
