const path = require("path");
const fs = require("fs/promises");
const wrapper = require("../decorators/wrapper");
const Users = require("../models/user");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const jimp = require("jimp");
const { nanoid } = require("nanoid");
const createEmail = require("../helpers/emailVerification");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  const avatar = gravatar.url(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const verificationToken = nanoid();
  console.log(verificationToken);
  const newUser = await Users.create({
    ...req.body,
    avatarURL: avatar,
    password: hashedPassword,
    verificationToken,
  });
  createEmail(email, verificationToken);
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
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
  await Users.findByIdAndUpdate(id, { token });
  res.json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  await Users.findByIdAndUpdate(id, { token: "" });
  res.status(204).end();
};

const getCurrentUser = async (req, res, next) => {
  const user = req.user;
  res.json({ email: user.email, subscription: user.subscription });
};
const updateStatus = async (req, res) => {
  const { _id: id } = req.user;
  const updatedUser = await Users.findByIdAndUpdate(
    id,
    {
      $set: { subscription: req.body.subscription },
    },
    { returnDocument: "after" }
  );

  res.status(200).json(updatedUser.subscription);
};

const changeAvatar = async (req, res) => {
  const destination = path.join(
    path.resolve("public/avatars"),
    req.file.filename
  );
  await jimp
    .read(req.file.path)
    .then((img) => {
      return img.resize(250, 250).write(req.file.path);
    })
    .catch((err) => {
      console.error(err);
    });
  await fs.rename(req.file.path, destination);
  const { _id: id } = req.user;
  await Users.findByIdAndUpdate(id, {
    avatarURL: `avatars/${req.file.filename}`,
  });
  res.json({ avatarURL: `avatars/${req.file.filename}` });
};

const verifyToken = async (req, res) => {
  console.log(req.params);
};

module.exports = {
  register: wrapper(register),
  login: wrapper(login),
  getCurrentUser: wrapper(getCurrentUser),
  logout: wrapper(logout),
  updateStatus: wrapper(updateStatus),
  changeAvatar: wrapper(changeAvatar),
  verifyToken: wrapper(verifyToken),
};
