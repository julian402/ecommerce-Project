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
import locationRoutes from "./routes/locationRoutes.js"


const app = express();
const PORT = 3000;

const upoadDir = path.join(import.meta.dirname, "public/upload");

if (!fs.existsSync(upoadDir)) {
  fs.mkdirSync(upoadDir, { recursive: true });
}

app.use(express.json());

connectDB();

app.use(userRoutes);
app.use(authRoutes);
app.use(productRoutes);

//edison
app.use(CategoriRoutes);

app.use(purchOrdRoutes);
app.use(locationRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:3000");
}); 

 