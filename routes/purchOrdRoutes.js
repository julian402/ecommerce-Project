import express from "express";
import { expressjwt } from "express-jwt";
import purchOrdController from "../controllers/purchOrdController.js";

const router = express.Router();

router.get(
  "/api/purchaseorder",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  purchOrdController.getAll
);

router.get(
    "/api/purchaseorder/id",
    expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    purchOrdController.getByuserId
  );
  

router.post(
  "/api/purchaseorder",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  purchOrdController.create
);
router.delete(
  "/api/purchaseorder",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  purchOrdController.destroy
);

export default router;
