const Role = require("../models/Role");

// CREATE ROLE
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Role name is required"
      });
    }

    if (!permissions || permissions.length === 0) {
      return res.status(400).json({
        message: "At least one permission is required"
      });
    }

    // Check duplicate role
    const existingRole = await Role.findOne({
      name: name.trim()
    });

    if (existingRole) {
      return res.status(400).json({
        message: "Role already exists"
      });
    }

    const role = await Role.create({
      name: name.trim(),
      permissions
    });

    res.status(201).json(role);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL ROLES
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({
      createdAt: -1
    });

    res.json(roles);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE ROLE PERMISSIONS
exports.updateRolePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;

    if (!permissions || permissions.length === 0) {
      return res.status(400).json({
        message: "Permissions are required"
      });
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({
        message: "Role not found"
      });
    }

    res.json(role);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE ROLE
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(
      req.params.id
    );

    if (!role) {
      return res.status(404).json({
        message: "Role not found"
      });
    }

    res.json({
      message: "Role deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};