import mongoose from "mongoose";

const productCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default:null,
    },
    description: {
      type: String,
      required: true,
      default:null,
    },
    gender: {
      type: String,
      required: true,
      default:null,
    },
    size: {
      type: String,
      required: true,
      default:null,
    },
    sale: {
      type: String,
      required: true,
      default:null,
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
