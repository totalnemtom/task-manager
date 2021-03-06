require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const Logger = require("./winston/logger");
const morganMiddleware = require("./middleware/morgan");
const bodyParser = require("body-parser");

//middlewares
app.use(morganMiddleware);
app.use(express.static("./public"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/v1/tasks", routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, Logger.log("info", `app is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
