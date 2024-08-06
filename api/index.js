const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "adfadfa";

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://kobruji:CyslGMRbrk2jlGI0@cluster0.mpnkyqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie('token', token).json('ok')
    });
  } else {
    res.status(400).json("wrong credentials");
  }
//   res.json(passOk);
});

app.listen(4000);

//mongodb
//username: kobruji
//password: CyslGMRbrk2jlGI0

//connection string
//mongodb+srv://kobruji:CyslGMRbrk2jlGI0@cluster0.mpnkyqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
