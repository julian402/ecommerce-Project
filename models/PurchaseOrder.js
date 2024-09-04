import mongoose from "mongoose";
import Product from "./Product.js";
import User from "./User.js";
import Location from "./Location.js";

const purchaseOrderSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    //Validar
    type: Number,
    required: true,
  },
  products: [
    {
      //Validar
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  paymentMet: {
    type: String,
    required: true,
  },
  address:{
    type:mongoose.Types.ObjectId,
    ref:'Location'
  },
  deleteAt:{
    type:Date,
    default:null,
  }
},{
    timestamps:true
});

const PurchaseOrder = mongoose.model("PurchaseOrder",purchaseOrderSchema)

export default Product
