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
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRolePermissions = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions: req.body.permissions },
      { new: true }
    );

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};