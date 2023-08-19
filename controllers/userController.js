const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

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
  return res.status(200).json({ errMessage: "Login user" });
};

const currentUser = async (req, res, next) => {
  return res.status(200).json({ errMessage: "Current user" });
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  currentUser: currentUser,
};
