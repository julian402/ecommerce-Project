//edison
import ProductCategory from "../models/ProductCategory.js";

async function getALL(req, res) {
  try {
    const categori = await ProductCategory.find({ deleteAt: null });
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

async function update(req, res) {
  try {
    const productCategoryToUpdate = await ProductCategory.findById(req.body.id);

    if (productCategoryToUpdate !== null) {
      const { name, description, gender, size, sale } = req.body;

      productCategoryToUpdate.name = name || productCategoryToUpdate.name;
      productCategoryToUpdate.description =
        description || productCategoryToUpdate.description;
      productCategoryToUpdate.gender = gender || productCategoryToUpdate.gender;
      productCategoryToUpdate.size = size || productCategoryToUpdate.size;
      productCategoryToUpdate.sale = sale || productCategoryToUpdate.sale;

      await productCategoryToUpdate.save();

      return res.json("La categoria ha sido actualizada");
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {
  try {
    const deleteProductCategory = await ProductCategory.findById(req.body.id);
    if (deleteProductCategory !== null) {
      deleteProductCategory.deleteAt = Date.now();
      await deleteProductCategory.save();
      return res.json("La categoria se ha eliminado");
    } else{
      return res.status(404).json({error: "Catagory Not exist"})
    }
  } catch (error) {
    console.log(error);
  }
}

export default {
  getALL,
  getById,
  create,
  update,
  destroy,
};
