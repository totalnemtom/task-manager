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

const verifyToken = require("../middleware/authentication");

router.route("/register").post(postUser);
router.route("/login").post(getUser);

//router.use(verifyToken);

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
