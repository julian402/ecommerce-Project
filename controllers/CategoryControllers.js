//edison
import ProductCategory from "../models/ProductCategory.js";

async function getALL(req, res) {
  try {
    const categori = await ProductCategory.find();
    return res.json(categori);
  } catch (error) {
    // console.log(error);
    return res.status(404).json("Categoria no encontrada");
  }
}

async function getById(req, res) {
  try {
    const categoris = await ProductCategory.findById(req.params.id);
    return res.json(categoris);
  } catch (error) {
    // console.log(error);
    return res.status(404).json("Categoria no existe");
  }
}

async function create(req, res) {
  try {
    const { name, description, gender, size, sale } = req.body;
    const newCategori = await ProductCategory.create({
      name: name,
      description: description,
      gender: gender,
      size: size,
      sale: sale,
    });

    return res.status(201).json("Categori create!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server error");
  }
}

async function update(req, res) {}

async function destroy(req, res) {}

export default {
  getALL,
  getById,
  create,
  update,
  destroy,
};
