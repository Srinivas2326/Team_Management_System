// models/Membership.js

const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },

  role: {
    type: String,
    enum: ["Admin", "Manager", "Viewer"],
    required: true
  }
},
{ timestamps: true }
);

module.exports =
mongoose.model("Membership", membershipSchema);