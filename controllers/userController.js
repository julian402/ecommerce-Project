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
      avatar: req.file.filename,
      typeUser: req.body.typeUser,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.errors.email.kind === 'unique') {
      return res.status(406).json({ message: "email invalid prove other" });
    }
  }
}

async function update(req, res) {
  try {
    const user = await User.findById(req.auth.id);
    if (user !== null) {
      const { name, lastName, email, password } = req.body;
      const avatar = req.file.filename;
      user.name = name || user.name;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.password = password || user.password;
      user.avatar = avatar || user.avatar;
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {
  try {
    const userToDelete = await User.findById(req.auth.id);
    if (userToDelete !== null) {
      userToDelete.deleteAt = Date.now();
      await userToDelete.save();
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not exist" });
    }
  } catch (error) {
    console.log(error);
  }
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  destroy: destroy,
};
