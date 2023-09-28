import User from "../dao/mongo/user.dao.js";

const userService = new User();

async function getUsers(req, res) {
  try {
    const result = await userService.getUser();
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
}

async function getUsersById(req, res) {
  try {
    const { uid } = req.params;
    const result = await userService.getUserById(uid);
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
}

async function saveUsers(req, res) {
  try {
    const user = req.body;
    const result = await userService.saveUser(user);
    res.json({ status: "success", result });
  } catch (err) {
    console.log(err);
  }
}

export { getUsers, getUsersById, saveUsers };
