import PurchaseOrder from "../models/PurchaseOrder.js";
import Location from "../models/Location.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

async function getAll(req, res) {
  try {
    const orders = await PurchaseOrder.find({ deleteAt: null })
      .populate("user", ["-_id", "name", "lastName", "email"])
      .populate("products.product", ["-_id", "-stock", "-category"]);
    return res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

async function getByuserId(req, res) {
  try{
    const orders = await PurchaseOrder.find({user: req.auth.id})
    if(orders !== null){
      return res.status(200).json(orders)
    }
    return res.json({message: 'not exist order for this user'})

  } catch(error){
    console.log(error)
    return res.status(500).json({message:'Internal server Error'})
  }
}

async function create(req, res) {
  try {
    const { amount, products, paymentMet, address } = req.body;
    const user = req.auth.id;
    const newPurchaseOrder = await PurchaseOrder.create({
      amount: amount,
      products: products,
      user: user,
      paymentMet: paymentMet,
      address: address,
    });
    return res.status(201).json("Purchase Order create successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

async function destroy(req, res) {
  try {
    const order = await PurchaseOrder.findById(req.body.id);

    if (order !== null) {
      order.deleteAt = Date.now();
      order.save();
      return res.status(200).json({message: 'Purchase Order delete successfully'})
    }
    return res.json({message: 'Not exist Purchase order with this id'})
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

export default { getAll, create, destroy,getByuserId };
