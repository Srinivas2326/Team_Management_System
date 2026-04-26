const Role = require("../models/Role");

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};