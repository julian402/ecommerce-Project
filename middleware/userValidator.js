import { check } from "express-validator";

const userValidator = [
  // Validación para el nombre
  check("name", "Name is required").not().isEmpty(),
  check("name", "Name must be at least 2 characters").isLength({ min: 2 }),
  check("name", "Name must only contain letters").isAlpha(),

  // Validación para el apellido
  check("lastName", "Last name is required").not().isEmpty(),
  check("lastName", "Last name must be at least 2 characters").isLength({
    min: 2,
  }),
  check("lastName", "Last name must only contain letters").isAlpha(),

  // Validación para el email
  check("email", "Email is required").not().isEmpty(),
  check("email", "Email is not valid").isEmail(),

  // Validación para la contraseña
  check("password", "Password is required").not().isEmpty(),
  check("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
  check("password", "Password must contain at least one number").matches(/\d/),
  check(
    "password",
    "Password must contain at least one uppercase letter"
  ).matches(/[A-Z]/),
  check(
    "password",
    "Password must contain at least one lowercase letter"
  ).matches(/[a-z]/),
  check(
    "password",
    "Password must contain at least one special character"
  ).matches(/[\W_]/),
];

export default userValidator;
