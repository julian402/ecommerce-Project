//edison
import CategoryControllers from "../controllers/CategoryControllers.js";
import ProductCategory from "../models/ProductCategory.js";
import typeUserValidator from "../middleware/typeUserValidator.js";
import { expressjwt } from "express-jwt";
import express from "express";
const router = express.Router();

router.get("/api/productCategory", CategoryControllers.getALL);
router.get("/api/productCategory/:id", CategoryControllers.getById);//traer producto de categoria por id
router.post("/api/productCategory", expressjwt({secret:process.env.JWT_SECRET, algorithms:['HS256']}),typeUserValidator,CategoryControllers.create);// se inserta categoria
router.patch("/api/productCategory", expressjwt({secret:process.env.JWT_SECRET,algorithms:['HS256']}),typeUserValidator,CategoryControllers.update); //actualizar
router.delete("/api/productCategory",expressjwt({secret:process.env.JWT_SECRET, algorithms:['HS256']}),typeUserValidator,CategoryControllers.destroy)//eliminar categoria

export default router
