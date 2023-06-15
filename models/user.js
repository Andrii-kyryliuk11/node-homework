const { Schema, model } = require("mongoose");
const { emailRegexp, subscriptionTypes } = require("../constants/users");
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false }
);

const Users = model("user", userSchema);

module.exports = Users;
