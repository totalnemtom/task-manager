const request = require("supertest");
const app = require("../app");
const newTask = require("../controllers/mock-data/new-task.json");
const mongoose = require("mongoose");
const sinon = require("sinon");
sinon.useFakeTimers();

const endpointURL = "/api/v1/tasks";

afterAll(async () => {
  await mongoose.disconnect();
});

afterAll(() => mongoose.disconnect());
describe("task integration", function () {
  it("POST endpoint should return 201 status code", async () => {
    const response = await request(app).post(endpointURL).send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body.completed).toBe(newTask.complated);
  });
});
