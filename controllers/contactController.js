const ContactModel = require("../models/contactModel");

const getAllContacts = async (req, res, next) => {
  const contact = await ContactModel.find();
  return res.status(200).json(contact);
};

const getContactById = async (req, res, next) => {
  const contact = await ContactModel.find({ user_id: req.user.id });
  if (!contact) {
    return res.status(400).json("contact not found");
  }
  return res.status(200).json(contact);
};

const updateContact = async (req, res, next) => {
  const contact = await ContactModel.findById(req.query.id);
  if (!contact) {
    return res.status(400).json("contact not found");
  }
  const updateContact = await ContactModel.findByIdAndUpdate(
    req.query.id,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json(updateContact);
};

const deleteContact = async (req, res, next) => {
  const contact = await ContactModel.findById(req.query.id);
  if (!contact) {
    return res.status(400).json("contact not found");
  }
  const deleteContact = await ContactModel.findByIdAndDelete(req.query.id);
  return res.status(200).json(deleteContact);
};

let createContact = async (req, res) => {
  console.log(req.body);
  const { email, name, phone } = req.body;
  try {
    if (!email || !name || !phone) {
      return res.status(400).json({
        errCode: -1,
        errMessage: "Lack of parameter!",
      });
    } else {
      const existingContact = await ContactModel.findOne({ email });
      if (existingContact) {
        return res.status(400).json({
          errCode: -1,
          errMessage: "Contact already exists with the same email!",
        });
      }

      const createContact = await ContactModel.create({
        name,
        email,
        phone,
      });
      return res.status(201).json({
        errCode: 0,
        data: createContact,
        errCode: "Create contact successfully!",
      });
    }
  } catch (e) {
    return res.status(500).json({
      errCode: 0,
      errMessage: "Create contact failure!",
    });
  }
};

module.exports = {
  getAllContacts: getAllContacts,
  getContactById: getContactById,
  createContact: createContact,
  updateContact: updateContact,
  deleteContact: deleteContact,
};
