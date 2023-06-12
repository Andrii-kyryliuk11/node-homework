// const HttpError = require("../helpers/HttpError");
const wrapper = require("../decorators/wrapper");
const User = require("../models/user");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;

  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrentUser = async (req, res, next) => {
  const user = req.user;
  res.json({ user: { email: user.email, subscription: user.subscription } });
};

module.exports = {
  register: wrapper(register),
  login: wrapper(login),
  getCurrentUser: wrapper(getCurrentUser),
};
