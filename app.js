const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("Task Manager");
});

const PORT = 3000;

app.listen(PORT, console.log(`app is listening on port ${PORT}`));
