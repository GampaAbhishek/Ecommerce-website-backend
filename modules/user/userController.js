const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const validationhandler = require("../../utility/achievesrp");

const Person = require("./userService");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    let resp = await Person.createUser(req.body);
    console.log(resp);
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const checkMail = await Person.findUserByEmail(req?.body?.Email);
    if (checkMail?._doc?._id) {
      const checkpassword = await bcrypt.compare(
        req?.body?.password,
        checkMail?.password
      );
      if (checkpassword) {
        const accessToken = jwt.sign(
          { email: checkMail.Email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "20s" }
        );
        const refreshToken = jwt.sign(
          { email: checkMail.Email, lastname: checkMail.lastName },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "50s" }
        );
        res.json({
          accesstoken: accessToken,
          refreshtoken: refreshToken,
          cookie: "jwt",
        });
      }
    } else {
      res.json({ message: "email not found" });
    }
  } catch (err) {
    console.log("error---->", err);
    res.json(err);
  }
});

router.post("/refresh", async (req, res) => {
  console.log(req.body.refreshToken);
  try {
    let refreshToken = req?.body?.refreshtoken;
    const checkRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (checkRefreshToken) {
      const accessToken = jwt.sign(
        {
          email: checkRefreshToken.email,
          lastname: checkRefreshToken.lastname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.status(200).json({ accesstoken: accessToken });
    } else {
      res.status(404).json({ message: "invalid refresh token" });
    }
  } catch (err) {
    console.log("error---->", err);
    res.json(err);
    res.status(401);
  }
});

router.get("/get", async (req, res) => {
  try {
    const rest = await Person.getAllUsers();
    res.status(200).send(rest);
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const resp = await Person.deleteUserById(req.params.id);
    res.status(200).send({ message: "successfully deleted" });
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

router.put("/update/:id", async (req, res) => {
  console.log(req.body);
  try {
    const posts = await Person.updateData(req.params.id, req.body);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(validationhandler(err));
  }
});

module.exports = router;
