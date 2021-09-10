const express = require("express");

const ProjectRouter = require("./project/router.js");
const ResourceRouter = require("./resource/router");
const taskRouter = require("./task/router");

const server = express();

server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);
server.use("/api/tasks", taskRouter);

module.exports = server;
