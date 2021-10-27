const mongoose = require("mongoose");

const connectionString = `mongodb+srv://totalnemtom:${process.env.DB_PASSWORD}@nodeprojects.tjomk.mongodb.net/TaskManagerDB?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connection succesful"))
  .catch((err) => console.log(err));
