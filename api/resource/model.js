const db = require("../../data/dbConfig");

const getResources = () => {
  return db("resources");
};

async function addResources(resource) {
  const newResource = await db("resources").insert(resource);
  return db("resources").where("resource_id", newResource);
}

module.exports = {
  getResources,
  addResources,
};
