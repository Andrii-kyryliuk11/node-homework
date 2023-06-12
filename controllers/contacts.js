const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contacts");
const wrapper = require("../decorators/wrapper");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.params;
  const skip = (page - 1) * limit;
  console.log(skip);
  console.log(limit);
  const data = await Contact.find({ owner, ...query }, "-id", { skip, limit });
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
  const { _id: owner } = req.user;
  const body = req.body;
  const data = await Contact.create({ ...body, owner });
  res.status(201).json(data);
};

const deleteContact = async (req, res, next) => {
  const id = req.params.id;
  const result = await Contact.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  if (!body) {
    throw HttpError(400, "missing fields");
  }
  const result = await Contact.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const result = await Contact.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
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
  updateStatusContact: wrapper(updateStatusContact),
};
