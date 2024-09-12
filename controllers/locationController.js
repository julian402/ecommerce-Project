import Location from "../models/Location.js";
import User from "../models/User.js";

async function getAll(req, res) {
  try {
    const locations = await Location.find({ deleteAt: null }).populate(
      "user",
      ["-_id", "name", "lastName", "email"]
    );
    return res.status(200).json({ locations });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ubicaciones", error });
  }
}

async function getLocationById(req, res) {
  try {
    const location = await location
      .find({ user: req.auth.id })
      .populate("user", ["-_id", "name", "lastName", "email"]);

    if (location !== null) {
      return res.status(200).json(location);
    }
    return res.json({ message: "not exist order for this location" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

async function create(req, res) {
  try {
    const { city, zipCode, address } = req.body;
    const user = req.auth.id;
    const newLocation = await Location.create({
      city: city,
      zipCode: zipCode,
     // user: user,
      address: address,
    });
    return res.status(201).json("Location create successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

async function update(req, res) {
  try {
    const location = await location.findById(req.body.id);
    if (location !== null) {
      const { city, zipCode, address } = req.body;

      location.city = city || location.city;
      location.zipCode = zipCode || location.zipCode;
      location.address = address || location.address;

      await product.save();
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "location not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {
  try {
    const location = await location.findById(req.body.id);

    if (location !== null) {
      location.deleteAt = Date.now();
      location.save();
      return res.status(200).json({ message: "Location delete successfully" });
    }
    return res.json({ message: "Not exist Location with this id" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
}

export default { getAll, create, destroy,update, getLocationById };
