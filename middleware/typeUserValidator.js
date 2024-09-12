import User from "../models/User.js";

async function typeUserValidator(req, res,next) {
  const user = await User.findById(req.auth.id);

  if (user.typeUser !== "Admin") {
    return res.status(401).json({ message: "User no authorized" });
  }
  next()
}

export default typeUserValidator;
