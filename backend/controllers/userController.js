const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email required"
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const user = await User.create({ name, email });

    res.status(201).json(user);

  } catch (error) {
    console.log("Create User Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};