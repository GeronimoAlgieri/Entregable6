import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
  // first_name: {
  //   type: String,
  //   require: true,
  // },
  // last_name: {
  //   type: String,
  //   require: true,
  // },
  // email: {
  //   type: String,
  //   require: true,
  // },
  // age: {
  //   type: Number,
  //   require: true,
  // },
  // password: {
  //   type: String,
  //   require: true,
  // },
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 100 },
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
