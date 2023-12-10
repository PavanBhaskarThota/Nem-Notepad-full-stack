const express = require("express");
const { connection } = require("./DataBase/db");
const { userRouter } = require("./Routes/user.router");
const { noteRouter } = require("./Routes/note.router");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.listen(5500, async () => {
  try {
    await connection;
    console.log("DataBase is connected");
    console.log("Sever at 5500 is connected");
  } catch (error) {}
});
