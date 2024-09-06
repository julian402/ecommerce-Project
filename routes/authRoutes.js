import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/api/login", authController.login);

export default router;
