const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeams = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};