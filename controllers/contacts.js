const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");

const wrapper = require("../decorators/wrapper");

const getAll = async (req, res, next) => {
  const data = await contacts.getAllContacts();
  res.json(data);
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  const data = await contacts.getContactById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.json(data);
};

const addContact = async (req, res, next) => {
  const body = req.body;
  const data = await contacts.addContact(body);
  res.status(201).json(data);
};

const deleteContact = async (req, res, next) => {
  const id = req.params.id;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const result = await contacts.updateContact(id, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: wrapper(getAll),
  getById: wrapper(getById),
  deleteContact: wrapper(deleteContact),
  updateContact: wrapper(updateContact),
  addContact: wrapper(addContact),
};
