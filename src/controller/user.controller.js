import { UserRepository } from "../dao/repository/users.repository.js";

const userService = new UserRepository();

const getUser = async (req, res) => {
  let user = await userService.getUserById();
  if (!user) {
    res.status(404).send({ status: "error", message: "No user found" });
  } else {
    res.send({ status: "success", payload: user });
  }
};

// const createUser = async (req, res) => {
//   let { first_name, last_name, dni, email, birthDate, gender } = req.body;
//   if(!first_name || !last_name || !dni || !email || !birthDate || !gender)
//   return res.status(400).send({status: "error", message: })
// };
