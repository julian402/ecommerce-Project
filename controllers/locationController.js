import Location from "../models/Location.js";
import User from "../models/User.js";

export async function getAll(req, res) {
  try {
    const locations = await Location.find({ deleteAt: null }).populate("user", [
      "-_id",
      "name",
      "lastName",
      "email",
    ]);
    return res.status(200).json({ locations });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function getLocationById(req, res) {
  try {
    const location = await Location.findById(req.params.id).populate("user");
    if (location.deletedAt !== null) {
      res.status(200).json(location);
    } else {
      res.status(404).json("Location no encontrado");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export async function create(req, res) {
  try {
    const { city, zipCode, address } = req.body;
    const user = req.auth.id;
    const newLocation = await Location.create({
      city: city,
      zipCode: zipCode,
      user: user,
      address: address,
    });
    return res.status(201).json("Location create successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}

export async function update(req, res) {
  try {
    const updateLocation = await Location.findById(req.body.id);
    if (updateLocation) {
      const { city, zipCode, address } = req.body;

      updateLocation.city = city || updateLocation.city;
      updateLocation.zipCode = zipCode || updateLocation.zipCode;
      updateLocation.address = address || updateLocation.address;

      await updateLocation.save();
      return res.status(200).json(updateLocation);
    } else {
      return res.status(404).json({ error: "location not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}

export async function destroy(req, res) {
  try {
    const locationToDelete = await Location.findById(req.body.id);

    if (locationToDelete !== null) {
      locationToDelete.deleteAt = Date.now();
      locationToDelete.save();
      return res.status(200).json({ message: "Location delete successfully" });
    } else {
      return res.status(404).json({ error: "Location not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}

export default { getAll, create, destroy, update, getLocationById };
