import "dotenv/config";
import cors from 'cors';
import express from "express";
import fs from "fs";
import path from "path";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//import productRoutes from './routes/productRoutes.js';
//edison
import CategoriRoutes from "./routes/CategoriRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import purchOrdRoutes from "./routes/purchOrdRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

export const app = express();
app.use(cors())

app.use(express.static("public/upload"))

app.use(express.json());

if (process.env.NODE_ENV !== 'test')
{connectDB();

const upoadDir = path.join(import.meta.dirname, "public/upload");

if (!fs.existsSync(upoadDir)) {
  fs.mkdirSync(upoadDir, { recursive: true });
}}

app.use(userRoutes);
app.use(authRoutes);
app.use(productRoutes);

//edison
app.use(CategoriRoutes);

app.use(purchOrdRoutes);
app.use(locationRoutes);


if (process.env.NODE_ENV !== 'test'){
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
}

export default app;