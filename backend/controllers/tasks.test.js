const taskController = require("./tasks");

describe("taskController.createTask", () => {
  it("should have a createTask function", () => {
    expect(typeof taskController.createTask).toBe("function");
  });
});
