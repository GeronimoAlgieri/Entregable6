import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
