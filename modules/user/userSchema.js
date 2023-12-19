const mongoose = require("mongoose");

const schemauser = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: { type: String, sparse: true },
  },
  { strict: false }
);

module.exports = mongoose.model("users", schemauser);
