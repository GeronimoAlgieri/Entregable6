import { usersDTO } from "../DTO/users.dto.js";

export class userRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUser(req, res) {
    return await this.dao.getUser(req, res);
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async createUser(user) {
    const result = new usersDTO(user);
    return await this.dao.createUser(result);
  }

  async deleteUser(id) {
    return await this.dao.deleteUser(id);
  }

  async getUserById(id) {
    return await this.dao.getUserById(id);
  }
}
