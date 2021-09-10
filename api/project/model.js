const db = require("../../data/dbConfig");

async function getAll() {
  const projects = await db("projects");
  return projects.map((project) => {
    return {
      ...project,
      project_completed: !!project.project_completed,
    };
  });
}

async function addProject(project) {
  const newProject = await db("projects").insert(project);
  const Project = await getById(newProject);
  return {
    ...Project[0],
    project_completed: !!Project[0].project_completed,
  };
}

const getById = (project_id) => {
  return db("projects").where({ project_id: Number(project_id) });
};

module.exports = {
  getAll,
  addProject,
  getById,
};
