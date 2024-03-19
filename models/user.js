const mongoose = require("mongoose");
const { Schema } = mongoose;
// const { Schema, model } = require("mongoose");
// const Schema = mongoose.Schema;
// const Joi = require("joi");
const { handleMongooseError } = require("../helpers/handleMongooseError");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: false,
    },
  }
  // { versionKey: false, timestamps: false }
);
const User = mongoose.model("User", userSchema);

userSchema.post("save", handleMongooseError);

module.exports = User;
