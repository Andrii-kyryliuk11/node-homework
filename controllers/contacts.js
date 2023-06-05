// const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contacts");
const wrapper = require("../decorators/wrapper");

const getAll = async (req, res, next) => {
  const data = await Contact.find();
  res.json(data);
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.json(data);
};

const addContact = async (req, res, next) => {
  const body = req.body;
  const data = await Contact.create(body);
  res.status(201).json(data);
};

// const deleteContact = async (req, res, next) => {
//   const id = req.params.id;
//   const result = await contacts.removeContact(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const updateContact = async (req, res, next) => {
//   const id = req.params.id;
//   const body = req.body;
//   const result = await contacts.updateContact(id, body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

module.exports = {
  getAll,
  getById: wrapper(getById),
  // deleteContact: wrapper(deleteContact),
  // updateContact: wrapper(updateContact),
  addContact: wrapper(addContact),
};
