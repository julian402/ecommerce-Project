import express from "express";
import productController from "../controllers/productController.js";

import { expressjwt } from "express-jwt";
import upload from "../config/multerConfig.js";
import typeUserValidator from "../middleware/typeUserValidator.js";

import validateFields from "../middleware/validateFields.js";
import productValidator from "../middleware/productValidator.js";
import tokenValidator from "../middleware/tokenValidator.js";

const router = express.Router();

router.get("/api/products", productController.getAll);
router.get("/api/products/:name", productController.getAllByName);
router.post(
  "/api/products",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  typeUserValidator,
  upload.array("images", 10),
  validateFields,
  productValidator,
  productController.create
);
router.patch(
  "/api/products",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  typeUserValidator,
  upload.array("images", 10),
  productController.update
);
router.delete(
  "/api/products",tokenValidator,
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  typeUserValidator,
  productController.destroy
);

export default router;
