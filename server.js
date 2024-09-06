import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB();

app.use(userRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:3000");
});
