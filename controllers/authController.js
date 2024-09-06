import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function login(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { prueba: "123", id: user._id },
          process.env.JWT_SECRET
        );
        return res.status(200).json({ token: token });
      }
    }
    return res.status(401).json({ error: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
  }
}

export default {
  login: login,
};
