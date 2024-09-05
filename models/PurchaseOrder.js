import mongoose from "mongoose";
import Product from "./Product.js";
import User from "./User.js";
import Location from "./Location.js";

const purchaseOrderSchema = mongoose.Schema(
  {
    amount: {
      //Validar
      type: Number,
      required: true,
    },

    products: [
      {
        product: {
          //Validar
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
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
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;

/*

EJEMPLO DE UNA ORDEN EN LA BBDD

{
    "amount": 5000,
    "products": [
        { "product": "66d9052879f3781a990191ac", "quantity": 4 },
        { "product": "66d9055ef31f2cde9c9f9fd4", "quantity": 2 }
    ],
    "user": "66d9055ef31f2cde9c9f9fd4",
    "paymentMet": "credit",
    "address": "Avenida Siempre Viva 123",
    "deletedAt": null,
    "createdAt": "2024-09-05T01:11:04.704+00:00",
    "updatedAt": "2024-09-05T01:11:04.704+00:00"
}

*/
