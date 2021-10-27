require("dotenv").config();
require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

app.get("/hello", (req, res) => {
  res.send("Task Manager");
});

//middlewares
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

const PORT = 3000;

app.listen(PORT, console.log(`app is listening on port ${PORT}`));
