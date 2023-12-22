const mongoose = require("mongoose");

const schemauser = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: false,
    },
    firstName: {
      type: String,
      unique: false,
    },
    lastName: {
      type: String,
      unique: false,
    },
    email: { type: String, sparse: true, unique: false },
  },
  { strict: false, unique: false }
);

module.exports = mongoose.model("users", schemauser);
