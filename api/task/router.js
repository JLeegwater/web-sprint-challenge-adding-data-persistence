const router = require("express").Router();
const Tasks = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Tasks.getTasks();
    console.log("🚀 ~ file: router.js ~ line 7 ~ router.get ~ tasks", tasks);

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const task = req.body;
    if (task.task_description && task.project_id) {
      const newTask = await Tasks.addTask(task);
      res.status(201).json({
        task_id: newTask.task_id,
        task_description: newTask.task_description,
        task_notes: newTask.task_notes,
        task_completed: newTask.task_completed,
        project_id: newTask.project_id,
      });
    } else {
      res.status(400).json({
        message: "task_description or project_id is missing",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
