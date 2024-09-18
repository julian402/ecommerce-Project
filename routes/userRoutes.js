import express from "express";
import upload from "../config/multerConfig.js";
import { expressjwt } from "express-jwt";
import userController from "../controllers/userController.js";
import userValidator from "../middleware/userValidator.js";
import validateFields from "../middleware/validateFields.js";
import "dotenv/config";

const router = express.Router();

router.get("/api/users", userController.getAll);
router.post(
  "/api/users",
  upload.single("avatar"),
  userValidator,
  validateFields,
  userController.create
);
router.patch(
  "/api/users",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  upload.single("avatar"),
  userController.update
);
router.delete(
  "/api/users",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.destroy
);

export default router;
