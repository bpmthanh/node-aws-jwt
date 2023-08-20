const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      errCode: -1,
      errMessage: "Lack of parameter!",
    });
  } else {
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
      res.status(400).json({ errMessage: "User has already registered!" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        userName,
        email,
        password: hashPassword,
      });
      res
        .status(400)
        .json({ errMessage: "Registered successfully!", data: user });
    }
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ errMessage: "Login failed" });
  }
  const user = await userModel.findOne({
    $or: [{ email: email }, { userName: email }],
  });

  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(401).json({ errMessage: accessToken });
  } else {
    res.status(401).json({ errMessage: "Login failure!" });
  }
};

const currentUser = async (req, res, next) => {
  return res.json(req.user);
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  currentUser: currentUser,
};
