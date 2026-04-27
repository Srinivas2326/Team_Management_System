
const Membership =
require("../models/Membership");

const Role =
require("../models/Role");

exports.getPermissions = async (req, res) => {
  try {
    const { userId, teamId } = req.params;

    const membership =
    await Membership.findOne({
      user: userId,
      team: teamId
    });

    if (!membership) {
      return res.json([]);
    }

    const role =
    await Role.findOne({
      name: membership.role
    });

    if (!role) {
      return res.json([]);
    }

    res.json(role.permissions);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};