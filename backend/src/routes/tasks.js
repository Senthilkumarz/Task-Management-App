const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Task } = require("../models");

// Create task
router.post("/", auth, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.update(req.body);
  res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.destroy();
  res.json({ message: "Task deleted" });
});

module.exports = router;
