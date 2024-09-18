import { check } from "express-validator";

const locationValidator = [
  // Validación para la ciudad
  check("city", "City is required").not().isEmpty(),
  check("city", "City must be at least 3 characters").isLength({ min: 3 }),

  // Validación para el código postal
  check("zipCode", "ZipCode is required").not().isEmpty(),
  check("zipCode", "ZipCode must be a valid number").isNumeric(),
  check("zipCode", "ZipCode must have 5 digits").isLength({ min: 5, max: 5 }),

  // Validación para la dirección
  check("address", "Address is required").not().isEmpty(),
  check("address", "Address must be at least 10 characters").isLength({
    min: 10,
  }),
];

export default locationValidator;
