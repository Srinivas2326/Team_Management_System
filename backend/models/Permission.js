const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "CREATE_TASK",
        "EDIT_TASK",
        "DELETE_TASK",
        "VIEW_ONLY"
      ]
    },

    description: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);