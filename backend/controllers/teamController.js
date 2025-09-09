const Team = require("../models/Team");

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, description, project, users } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Team name is required" });
    }

    const team = new Team({ name, description, project, users });
    await team.save();

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("project", "name")
      .populate("users", "name email");

    const mappedTeams = teams.map((team) => ({
      id: team._id.toString(),
      name: team.name,
      description: team.description,
      project: team.project,
      users: team.users,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    }));

    res.json(mappedTeams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to load teams" });
  }
};

// Delete a team
const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
};

// Update a team by ID
const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, description, project, users } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { name, description, project, users },
      { new: true, runValidators: true }
    )
      .populate("project", "name")
      .populate("users", "name email");

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({
      message: "Team updated successfully",
      team: {
        id: updatedTeam._id.toString(),
        name: updatedTeam.name,
        description: updatedTeam.description,
        project: updatedTeam.project,
        users: updatedTeam.users,
        createdAt: updatedTeam.createdAt,
        updatedAt: updatedTeam.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
};

module.exports = { createTeam, getAllTeams, deleteTeam, updateTeam };
