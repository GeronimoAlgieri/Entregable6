import UserModel from "./models/user.js";

export class UserDaoMongo {
  async getUser() {
    try {
      const result = await UserModel.find();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getUserById(id) {
    try {
      const result = await UserModel.findById(id);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async saveUser(user) {
    try {
      const result = await UserModel.create(user);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(id, user) {
    try {
      const result = await UserModel.findByIdAndUpdate(id, user);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
