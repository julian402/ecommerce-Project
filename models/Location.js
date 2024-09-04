import mongoose from "mongoose";
import User from './User.js'

const locationSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
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

const Location = mongoose.model("Location", locationSchema);

export default Location;
