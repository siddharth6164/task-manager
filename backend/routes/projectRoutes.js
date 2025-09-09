// routes/projectRoute.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");

// Create a new project (Admin & Manager)
router.post("/", auth, authorizeRole("admin", "manager"), async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Project name is required" });
  }

  try {
    const project = new Project({ name });
    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all projects (All roles)
router.get("/", auth, authorizeRole("admin", "manager", "employee"), async (req, res) => {
  try {
    const projects = await Project.find();
    const mappedProjects = projects.map((project) => ({
      id: project._id.toString(),
      name: project.name,
      url: `/projects/${project._id}`,
    }));
    res.json(mappedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load projects" });
  }
});

// Delete a project (Admin & Manager)
router.delete("/:id", auth, authorizeRole("admin", "manager"), async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
