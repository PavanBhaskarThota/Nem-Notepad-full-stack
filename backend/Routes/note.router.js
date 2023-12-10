const express = require("express");
const { NoteModel } = require("../Models/note.model");
const jwt = require("jsonwebtoken");
const { authmiddleware } = require("../Middlewares/auth.middleware");

const noteRouter = express.Router();

noteRouter.use(authmiddleware);

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send("new note has added");
  } catch (error) {
    res.status(400).send("err", error);
  }
});

noteRouter.get("/", async (req, res) => {
  const { userId } = req.body;
  try {
    const notes = await NoteModel.find({ userId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: id });
    console.log("update",note)
    if (req.body.userId === note.userId) {
      await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send("Notes has updated of id ");
    } else {
      res.status(200).send("you are not authorised");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await NoteModel.find({ _id: id });

    if (req.body.userId === note.userId) {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.status(200).send("Notes has Deleted of id ");
    } else {
      res.status(200).send("your not authorised");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  noteRouter,
};
