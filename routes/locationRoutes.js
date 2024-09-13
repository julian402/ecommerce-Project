import express from "express";
import { expressjwt } from "express-jwt";
import locationController from "../controllers/locationController.js";

const router = express.Router();

router.get("/api/locations", locationController.getAll);
router.get("/api/locations/:id", locationController.getLocationById);
router.post(
  "/api/locations",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  locationController.create
);

router.patch(
  "/api/locations/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  locationController.update
);
router.delete(
  "/api/locations/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  locationController.destroy
);

export default router;