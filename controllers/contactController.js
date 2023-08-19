const ContactModel = require("../models/contactModel");

const getAllContacts = async (req, res, next) => {
  const contact = await ContactModel.find();
  res.status(200).json(contact);
};

const getContactById = async (req, res, next) => {
  const contact = await ContactModel.find();
  res.status(200).json(contact);
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
      const createContact = await ContactModel.create({
        name,
        email,
        phone,
      });
      res.status(201).json({
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
  createContact: createContact,
  getAllContacts: getAllContacts,
  getContactById: getContactById,
};
