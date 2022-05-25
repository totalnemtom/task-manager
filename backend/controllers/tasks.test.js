const TaskController = require("./tasks");
const TaskSchema = require("../models/task");
const httpMocks = require("node-mocks-http");
const newTask = require("./mock-data/new-task.json");
const taskArray = require("./mock-data/task-array.json");

TaskSchema.create = jest.fn();
TaskSchema.find = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TaskController.createTask", () => {
  beforeEach(() => {
    req.body = newTask;
  });
  it("should have a createTask function", () => {
    expect(typeof TaskController.createTask).toBe("function");
  });
  it("should call taskSchema.create", async () => {
    req.body = newTask;
    await TaskController.createTask(req, res, next);
    expect(TaskSchema.create).toBeCalledWith(newTask);
  });
  it("should return 201 response code", async () => {
    req.body = newTask;
    await TaskController.createTask(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    TaskSchema.create.mockReturnValue(newTask);
    await TaskController.createTask(req, res, next);
    expect(res._getJSONData()).toStrictEqual({ newTask });
  });
  it("should handle error", async () => {
    const errMessage = { message: "missing properties" };
    const rejectedPromise = Promise.reject(errMessage);
    TaskSchema.create.mockReturnValue(rejectedPromise);
    await TaskController.createTask(req, res, next);
    expect(next).toBeCalledWith(errMessage);
  });
});

describe("TaskController.getAllTask", () => {
  it("should return 200 status code", () => {
    TaskController.getAllTasks(req, res, next);
    expect(res.statusCode).toBe(200);
  });
  it("should return array in response", async () => {
    TaskSchema.find.mockReturnValue(taskArray);
    await TaskController.getAllTasks(req, res, next);
    console.log(res._isEndCalled());
    expect(res.length).toBe(taskArray.length);
  });
});
