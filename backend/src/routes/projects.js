const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Project, Task } = require("../models");

// List projects
router.get("/", auth, async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

// Add project
router.post("/", auth, async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({ name, description });
  res.json(project);
});

// Project detail with tasks
router.get("/:id", auth, async (req, res) => {
  const project = await Project.findByPk(req.params.id, { include: Task });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

module.exports = router;
