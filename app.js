require("dotenv").config();
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

app.get("/hello", (req, res) => {
  res.send("Task Manager");
});

//middlewares
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

const PORT = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`app is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
