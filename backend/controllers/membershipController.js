const Membership = require("../models/Membership");

exports.createMembership = async (req, res) => {
  try {
    const { user, team, role } = req.body;

    const existing = await Membership.findOne({ user, team });

    if (existing) {
      existing.role = role;
      await existing.save();

      return res.json({
        message: "Updated",
        data: existing
      });
    }

    const data = await Membership.create({
      user,
      team,
      role
    });

    res.status(201).json(data);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMemberships = async (req, res) => {
  try {
    const data = await Membership.find()
      .populate("user")
      .populate("team");

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};