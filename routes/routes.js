const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());
router.use(express.json());

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const { postUser, getUser } = require("../controllers/user");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
router.route("/register").post(postUser);
router.route("/login").post(getUser);

module.exports = router;