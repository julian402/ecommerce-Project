import mongoose from "mongoose";

const productCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      default:null,
    },
    size: {
      type: String,
      required: true,
      default:'none',
    },
    sale: {
      type: String,
      required: true,
      default:'none',
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

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

export default ProductCategory;
