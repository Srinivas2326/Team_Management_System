const Membership = require("../models/Membership");

exports.getPermissions = async (req, res) => {
  try {
    const { userId, teamId } = req.params;

    const membership = await Membership.findOne({
      user: userId,
      team: teamId
    }).populate("role");

    if (!membership) {
      return res.json([]);
    }

    res.json(membership.role.permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};