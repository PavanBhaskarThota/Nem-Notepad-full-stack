const express = require("express");
const { connection } = require("./DataBase/db");
const { userRouter } = require("./Routes/user.router");
const { noteRouter } = require("./Routes/note.router");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);


app.listen(4500, async () => {
  try {
    await connection;
    console.log("Sever at 4500 and DataBase is connected");
  } catch (error) {}
});
