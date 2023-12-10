const express = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res.status(200).send("User with this email is already exist");
    }

    if (pass.length >= 8) {
      bcrypt.hash(pass, 5, async (err, hash) => {
        req.body.pass = hash;
        const user = new UserModel(req.body);
        await user.save();
        const newuser = req.body;
        res.status(200).send({
          msg: "The new user has been registered",
          registeredUser: newuser,
        });
      });
    } else {
      res.status(200).send("password length should be aleast 8");
    }
  } catch (error) {
    res.status(400).send("err", error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userid: user._id, username: user.username },
            "DC"
          );
          res.status(200).send({ status: "Login successfull", token: token });
        } else {
          res.status(200).send({ msg: "wrong Credentials!" });
        }
      });
    } else {
      res
        .status(200)
        .send("user does not Exist with this email register first!");
    }
  } catch (error) {
    res.status(400).send("err", error);
  }
});

module.exports = {
  userRouter,
};
