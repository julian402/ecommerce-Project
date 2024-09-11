import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";

async function getAll(req, res) {
  try {
    const products = await Product.find({ deleteAt: null }).populate(
      "category",
      ["-_id", "name", "gender"]
    );
    console.log(`[Product getAll]: ${req}`);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
}

async function getAllByName(req, res) {
  try {
    const name = req.params.name;
    const products = await Product.find({
      name: { $regex: `${name}` },
    }).populate("category", ["-_id", "name", "gender"]);
    return res.status(200).json(products);
  } catch (error) {
    console.log(`[Product GetAllByName] ${error}`);
  }
}

async function create(req, res) {
  try {
    const { name, size, stock, price, category, brand } = req.body;
    const imagesArray = [];

    for (const file of req.files) {
      imagesArray.push(file.filename);
    }

    const newProduct = await Product.create({
      name: name,
      size: size,
      stock: stock,
      price: price,
      category: category,
      brand: brand,
      images: imagesArray,
    });

    return res.status(200).json({ message: `Product create successfully` });
  } catch (error) {
    console.log(error);
  }
}

async function update(req, res) {
  try {
    const product = await Product.findById(req.body.id);
    if (product !== null) {
      const { name, size, stock, price, category, brand } = req.body;
      const imagesArray = [];

      for (const file of req.files) {
        imagesArray.push(file.filename);
      }
      product.name = name || product.name;
      product.size = size || product.size;
      product.stock = stock || product.stock;
      product.price = price || product.price;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.images = imagesArray || product.images;
      await product.save();
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {
  try {
    const producToDelete = await Product.findById(req.body.id);
    if (producToDelete !== null) {
      producToDelete.deleteAt = Date.now();
      await producToDelete.save();
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ error: "Product not exist" });
    }
  } catch (error) {
    console.log(error);
  }
}

export default { getAll, getAllByName, create, update, destroy };
