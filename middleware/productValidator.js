import { check } from "express-validator";

const productValidator = [
  // Validación para el nombre (requerido y al menos 3 caracteres)
  check("name", "Name is required").not().isEmpty(),
  check("name", "Name must be at least 3 characters").isLength({ min: 3 }),

  check("size", "Size is required").not().isEmpty(),
  check(
    "size",
    "Size must be a valid clothing size (XS, S, M, L, XL, etc.) or a valid shoe size (1-40)"
  ).custom((value) => {
    const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const shoeSize = parseInt(value, 10);

    // Valida si es talla de zapato o ropa
    if (clothingSizes.includes(value) || (shoeSize >= 1 && shoeSize <= 40)) {
      return true;
    }
    throw new Error(
      "Invalid size: Please enter a valid clothing or shoe size."
    );
  }),

  // Validación para el stock (requerido y debe ser un número entero positivo)
  check("stock", "Stock is required").not().isEmpty(),
  check("stock", "Stock must be an integer").isInt({ min: 0 }),

  // Validación para el precio (requerido y debe ser un número positivo)
  check("price", "Price is required").not().isEmpty(),
  check("price", "Price must be a positive number").isFloat({ min: 0 }),

  // Validación para la categoría (opcional, pero si existe debe ser un ID de Mongo válido)
  check("category", "Category must be a valid MongoDB ID")
    .optional()
    .isMongoId(),

  // Validación para la marca (requerida y debe ser una cadena de texto)
  check("brand", "Brand is required").not().isEmpty(),
  check("brand", "Brand must be at least 2 characters").isLength({ min: 2 }),

  // Validación para imágenes (opcional, debe ser un array de strings si está presente)
  check("images", "Images must be an array").optional().isArray(),
  check("images.*", "Each image must be a valid string URL")
    .optional()
    .isString(),
];

export default productValidator;
