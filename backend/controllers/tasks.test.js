const TaskController = require("./tasks");
const TaskSchema = require("../models/task");
const httpMocks = require("node-mocks-http");
const newTask = require("./mock-data/new-task.json");

TaskSchema.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
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
    console.log(res._isEndCalled());
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    TaskSchema.create.mockReturnValue(newTask);
    await TaskController.createTask(req, res, next);
    expect(res._getJSONData()).toStrictEqual({ newTask });
  });
});
