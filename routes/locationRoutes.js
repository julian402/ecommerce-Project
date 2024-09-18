import express from "express";
import { expressjwt } from "express-jwt";
import locationController from "../controllers/locationController.js";
import validateFields from "../middleware/validateFields.js";
import locationValidator from "../middleware/locationValidator.js";

const router = express.Router();

router.get("/api/locations", locationController.getAll);
router.get("/api/locations/:id", locationController.getLocationById);
router.post(
  "/api/locations",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  validateFields,
  locationValidator,
  locationController.create
);

router.patch(
  "/api/locations",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  locationController.update
);
router.delete(
  "/api/locations",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  locationController.destroy
);

export default router;
