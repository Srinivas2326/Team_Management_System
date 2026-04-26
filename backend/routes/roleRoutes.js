const router = require("express").Router();

const {
  createRole,
  getRoles,
  updateRolePermissions
} = require("../controllers/roleController");

router.post("/", createRole);
router.get("/", getRoles);
router.put("/:id/permissions", updateRolePermissions);

module.exports = router;