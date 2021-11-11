const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
<<<<<<< Updated upstream
const { createCustomError } = require("../errors/custom-errors");
=======
const Logger = require("../winston/logger");
const { createCustomError } = require("../errors/custom-errors");
const httpStatusCodes = require("../errors/status-codes");
>>>>>>> Stashed changes

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
<<<<<<< Updated upstream
    return next(createCustomError(`No task with id: ${taskID}`, 404));
=======
    return next(
      createCustomError(
        "not found error",
        httpStatusCodes.NOT_FOUND,
        true,
        `No task with id: ${taskID}`
      ),
      Logger.log("error", "Task not found")
    );
>>>>>>> Stashed changes
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
<<<<<<< Updated upstream
    return next(createCustomError(`No task with id: ${taskID}`, 404));
=======
    return next(
      createCustomError(
        "not found error",
        httpStatusCodes.NOT_FOUND,
        true,
        `No task with id: ${taskID}`
      ),
      Logger.log("error", "Couldn't update task")
    );
>>>>>>> Stashed changes
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
<<<<<<< Updated upstream
    return next(createCustomError(`No task with id: ${taskID}`, 404));
=======
    return next(
      createCustomError(
        "not found error",
        httpStatusCodes.NOT_FOUND,
        true,
        `No task with id: ${taskID}`
      ),
      Logger.log("error", "Couldn't delete task")
    );
>>>>>>> Stashed changes
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
