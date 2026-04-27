
const Membership =
require("../models/Membership");

exports.createMembership = async (req, res) => {
  try {
    const { user, team, role } = req.body;

    let data =
    await Membership.findOne({ user, team });

    if (data) {
      data.role = role;
      await data.save();

      return res.json({
        message: "Role Updated Successfully",
        data
      });
    }

    data = await Membership.create({
      user,
      team,
      role
    });

    res.status(201).json({
      message: "Membership Created Successfully",
      data
    });

  } catch (error) {
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


exports.updateMembership = async (req, res) => {
  try {
    const data =
    await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Updated Successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.deleteMembership = async (req, res) => {
  try {
    await Membership.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Removed Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};