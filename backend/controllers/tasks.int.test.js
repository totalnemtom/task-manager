const request = require("supertest");
const app = require("../app");
const newTask = require("../controllers/mock-data/new-task.json");
const sinon = require("sinon");
sinon.useFakeTimers();

const endpointURL = "/api/v1/tasks/";

describe(endpointURL, () => {
  it(
    "POST " +
      endpointURL +
      " without authentication should return 403 status code",
    async () => {
      const response = await request(app).post(endpointURL).send(newTask);
      expect(response.statusCode).toBe(403);
    }
  );
});

// TODO: figure out how to mock authentication
