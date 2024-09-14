import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import "dotenv/config";

async function userSeeders() {
  connectDB();
  await User.create({
    name: "Julian",
    lastName: "Castro",
    email: "julicastro@gmail.com",
    password: process.env.USER_PASSWORD_SEEDER,
    avatar:'userGeneric.png',
    typeUser: "Admin",
  });
  await User.create({
    name: "Julian",
    lastName: "Castro",
    email: "julicastrotr@gmail.com",
    password: process.env.USER_PASSWORD_SEEDER,
    avatar:'userGeneric.png',
    typeUser: "Admin",
  });

  console.log("Se han creados los Seeders de manera Exitosa");
  process.exit(1);
}

userSeeders();
