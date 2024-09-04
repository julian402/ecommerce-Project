import mongoose from "mongoose";
import Location from "./Location.js";
import mongooseValidator from "mongoose-unique-validator";

//const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    typeUser: {
      type: String,
      required: true,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
