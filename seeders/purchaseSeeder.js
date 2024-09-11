import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import PurchaseOrder from "../models/PurchaseOrder.js";

connectDB()

async function purchaseOrderSeeder(){
    await PurchaseOrder.create({
            amount: 1500000,
            products:[
                {"product":"66dfad0978a8eeb8f9c8fe41",
                "quantity":10},
                {"product":"66dddd7d03b917ccb7f7afb3",
                "quantity":10},
                {"product":"66dde2fc84bfa9c9d237f638",
                "quantity":10}
            ],
            user:"66ddbf0635928d6e0770a87b",
            paymentMet:"Credit_Card",
            address:"66ddbf0635928d6e0770a881"
        
    }),
    await PurchaseOrder.create({
        amount: 2560000,
        products:[
            {"product":"66dfad0978a8eeb8f9c8fe41",
            "quantity":12},
            {"product":"66dddd7d03b917ccb7f7afb3",
            "quantity":5},
        ],
        user:"66ddbf0635928d6e0770a87b",
        paymentMet:"PSE",
        address:"66ddbf0635928d6e0770a881"
    
}), await PurchaseOrder.create({
    amount: 3250000,
    products:[
        {"product":"66dfad0978a8eeb8f9c8fe41",
        "quantity":45},
        {"product":"66dddd7d03b917ccb7f7afb3",
        "quantity":2},
        {"product":"66dde2fc84bfa9c9d237f638",
        "quantity":3}
    ],
    user:"66ddbf0635928d6e0770a87b",
    paymentMet:"Mercado Pago",
    address:"66ddbf0635928d6e0770a881"

})
    console.log('purchase order create successfully')
    process.exit(1)
}

purchaseOrderSeeder()