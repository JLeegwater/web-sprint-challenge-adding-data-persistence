const express = require("express");
const Projects = require("./model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.getAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newProject = await Projects.addProject(req.body);
    const output = {
      project_id: newProject.project_id,
      project_name: newProject.project_name,
      project_description: newProject.project_description,
      project_completed: newProject.project_completed,
    };
    res.status(201).json(output);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    sageAdvice: "Finding the real error is 90% of the bug fix",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
