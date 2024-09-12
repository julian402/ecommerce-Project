import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

connectDB()

async function productsSeeder() {
    await Product.create({
        name:'Tennis Black',
        size: 42,
        stock: 320,
        price: 15000,
        category:'66ddbf0635928d6e0770a87b',
        brand: "Adidas",
        images:["1725816189378-Adidas1.webp"],
    })
    await Product.create({
        name:'Tennis Gray',
        size: 40,
        stock: 120,
        price: 155000,
        category:'66ddbf0635928d6e0770a87b',
        brand: "Nike",
        images:["1725816189378-Adidas1.webp"],
    }),
    await Product.create({
        name:'Tennis Grave',
        size: 36,
        stock: 1520,
        price: 15000,
        category:'66ddbf0635928d6e0770a87b',
        brand: "Adidas",
        images:["1725816189378-Adidas1.webp"],
    })
    console.log('Productos Creados')
    process.exit(1)
}

productsSeeder()