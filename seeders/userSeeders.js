import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

async function userSeeders() {
  connectDB();
  await User.create({
    name: "Julian",
    lastName: "Castro",
    email: "julicastro@gmail.com",
    password: "apdfpjo",
    typeUser: "admin",
  });
  await User.create({
    name: "Julian",
    lastName: "Castro",
    email: "julicastro@gmail.com",
    password: "apdfpjo",
    typeUser: "admin",
  });

  console.log("Se han creados los Seeders de manera Exitosa");
  process.exit(1);
}

userSeeders();
