const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  modifyTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(modifyTask).delete(deleteTask);

module.exports = router;
