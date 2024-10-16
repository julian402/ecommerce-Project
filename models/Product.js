import mongoose from "mongoose";
import ProductCategory from "./ProductCategory.js";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "ProductCategory",
    },
    brand: {
      type: String,
      required: true,
    },
    images:[String],
    deleteAt: {
      type: Date,
      default: null,
    },
    description:{
      type: String,
      required:true,
    },
    sale:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
