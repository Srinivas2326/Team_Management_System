const router = require("express").Router();

const {
  createMembership,
  getMemberships
} = require("../controllers/membershipController");

router.post("/", createMembership);
router.get("/", getMemberships);

module.exports = router;