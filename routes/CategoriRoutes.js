//edison
import CategoryControllers from "../controllers/CategoryControllers.js";
import ProductCategory from "../models/ProductCategory.js";
import upload from "../config/multerConfig.js";
import { expressjwt } from "express-jwt";
import express from "express";
const router = express.Router();

router.get("/api/productCategory", CategoryControllers.getALL);
router.get("/api/productCategory/:id", CategoryControllers.getById);//traer producto de categoria por id
router.post("/api/productCategory", CategoryControllers.create);// se inserta categoria
router.patch("/api/productCategory/:id", CategoryControllers.update); //actualizar
router.delete("/api/productCategory/:id", CategoryControllers.destroy)//eliminar categoria
export default router
