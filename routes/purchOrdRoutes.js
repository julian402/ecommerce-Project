import express from "express";
import { expressjwt } from "express-jwt";
import purchOrdController from "../controllers/purchOrdController.js";
import validateFields from "../middleware/validateFields.js";
import tokenValidator from "../middleware/tokenValidator.js";

const router = express.Router();

router.get(
  "/api/purchaseorder",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  purchOrdController.getAll
);

router.get(
  "/api/purchaseorder/id",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  purchOrdController.getByuserId
);

router.post(
  "/api/purchaseorder",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  validateFields,
  purchOrdController.create
);
router.delete(
  "/api/purchaseorder",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  purchOrdController.destroy
);

export default router;
