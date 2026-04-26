const router = require("express").Router();

const {
  createMembership,
  getMemberships,
  updateMembership,
  deleteMembership
} = require("../controllers/membershipController");

router.post("/", createMembership);
router.get("/", getMemberships);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

module.exports = router;