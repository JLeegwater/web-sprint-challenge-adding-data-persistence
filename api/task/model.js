const db = require("../../data/dbConfig");

const getTasks = async () => {
  const tasks = await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "project_name",
      "project_description"
    );
  return tasks.map((task) => {
    return {
      ...task,
      task_completed: !!task.task_completed,
    };
  });
};

const addTask = async (task) => {
  const newTask = await db("tasks").insert(task, "id");
  const Task = await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .where("t.task_id", newTask)
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "p.project_id"
    );

  return {
    ...Task[0],
    task_completed: !!Task[0].task_completed,
  };
};

module.exports = {
  getTasks,
  addTask,
};
