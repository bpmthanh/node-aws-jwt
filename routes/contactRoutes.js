const express = require("express");
const contactController = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

const contactRoutes = (app) => {
  router.use(validateToken);
  router.post("/create-contact", contactController.createContact);
  router.get("/get-all-contacts", contactController.getAllContacts);
  router.get("/get-contact-by-id", contactController.getContactById);
  router.put("/update-contact-by-id", contactController.updateContact);
  router.get("/delete-contact-by-id", contactController.deleteContact);
  return app.use("/api/contacts", router);
};

module.exports = contactRoutes;
