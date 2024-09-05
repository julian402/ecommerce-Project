import User from "../models/User.js";

async function getAll(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}

async function create(req, res) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      typeUser: req.body.typeUser,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
}

export default {
  getAll: getAll,
  create: create,
};
