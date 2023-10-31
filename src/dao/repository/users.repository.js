import { usersDTO } from "../DTO/users.dto.js";
import { UserDaoMongo } from "../mongo/user.dao.js";

export class UserRepository {
  constructor() {
    this.userDao = new UserDaoMongo();
  }

  async getUser(req, res) {
    return await this.userDao.getUser(req, res);
  }

  async getUserByEmail(email) {
    return await this.userDao.getUserByEmail(email);
  }

  async createUser(user) {
    const result = new usersDTO(user);
    return await this.userDao.createUser(result);
  }

  async deleteUser(id) {
    return await this.userDao.deleteUser(id);
  }

  async getUserById(id) {
    return await this.userDao.getUserById(id);
  }

  async modifyUser(id, user) {
    return await this.userDao.modifyUser(id, user);
  }
}
