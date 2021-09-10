const router = require("express").Router();
const { receiveMessageOnPort } = require("worker_threads");
const Resources = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const resources = await Resources.getResources();

    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const resource = req.body;

    const resources = await Resources.getResources();
    const found = resources.findIndex((res) => {
      res.resource_name === resource.resource_name;
    });
    if (found !== -1) {
      return res.status(404).json({ message: "Name is already taken" });
    } else {
      const newResource = await Resources.addResources(resource);
      res.status(201).json(newResource[0]);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
