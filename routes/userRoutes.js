import express from "express";
import { expressjwt } from "express-jwt";
import userController from "../controllers/userController.js";
import "dotenv/config";

const router = express.Router();

router.get("/api/users", userController.getAll);
router.post("/api/users", userController.create);
router.patch(
  "/api/users",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.update
);
router.delete(
  "/api/users",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.destroy
);

export default router;
