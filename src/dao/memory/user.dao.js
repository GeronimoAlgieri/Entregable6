export class UserDaoMemory {
  constructor() {
    this.users = [];
  }

  async getUser() {
    return this.users;
  }

  async getUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async createUser(user) {
    this.users.push(user);
    this.users.forEach((user) => {
      user.id = this.users.indexOf(users) + 1;
    });
    return user;
  }

  async deleteUser(id) {
    const result = this.users.findIndex((user) => user.id === +id);
    if (result === -1) return "Usuario no encontrado";
    this.users.splice(result, 1);
    return +id;
  }

  async getUserById(id) {
    return this.users.find((user) => user.id === +id);
  }

  async modifyUser(id, user) {
    let indexUser = this.users.findIndex((user) => user.id === +id);
    this.users[indexUser] = user;
    return user;
  }
}
