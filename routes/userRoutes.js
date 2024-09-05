import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/api/users", userController.getAll);
router.post("/api/users", userController.create);

export default router;
