const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

const initWebRoutes = (app) => {
  router.post("/api/create-contact", contactController.createContact);
  router.get("/api/get-contact", contactController.getAllContacts);
  router.get("/api/get-contact", contactController.getContactById);
  return app.use("/", router);
};

module.exports = initWebRoutes;
