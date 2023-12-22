const user = require("./userSchema");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

async function createUser(data) {
  let salt = await bcrypt.genSalt(10);
  const bcryptpassword = await bcrypt.hash(data?.password, salt);
  data.password = bcryptpassword;
  data.firstName = "tytweyutrewuywwett";
  data.lastName = "hjhdjghgjhghjttt";
  const newUser = new user(data);
  return await newUser.save();
}

async function findUserByEmail(email) {
  return await user.findOne({ Email: email });
}

async function getAllUsers() {
  return await user.find();
}

async function deleteUserById(id) {
  return await user.findByIdAndDelete(convertObjectId(id));
}

async function updateData(id, data) {
  return await user.findByIdAndUpdate(convertObjectId(id), data);
}

function convertObjectId(id) {
  return new mongoose.Types.ObjectId(id);
}

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  deleteUserById,
  updateData,
};
