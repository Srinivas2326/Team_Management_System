const router = require("express").Router();
const {
  getPermissions
} = require("../controllers/permissionController");

router.get("/:userId/:teamId", getPermissions);

module.exports = router;