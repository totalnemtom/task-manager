const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const Logger = require("../winston/logger");
const { createCustomError } = require("../errors/custom-errors");
const httpStatusCodes = require("../errors/status-codes");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({ newTask });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(
      createCustomError(
        "not found error",
        httpStatusCodes.NOT_FOUND,
        true,
        `No task with id: ${taskID}`
      ),
      Logger.log("error", "Task not found")
    );
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(
        "not found error",
        httpStatusCodes.NOT_FOUND,
        true,
        `No task with id: ${taskID}`
      ),
      Logger.log("error", "Couldn't update task")
    );
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(
      createCustomError(
        "not found error",
        httpStatusCodes.NOT_FOUND,
        true,
        `No task with id: ${taskID}`
      ),
      Logger.log("error", "Couldn't delete task")
    );
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
