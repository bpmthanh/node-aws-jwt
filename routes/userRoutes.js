const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler");

const userRoutes = (app) => {
  router.post("/register", userController.registerUser);
  router.post("/login", userController.loginUser);
  router.get("/current", validateToken, userController.currentUser);
  return app.use("/api/users", router);
};

module.exports = userRoutes;
