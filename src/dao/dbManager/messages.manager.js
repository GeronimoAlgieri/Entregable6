import MessagesModel from "../models/message.js";

export default class Message {
  getAll = async () => {
    let result = await MessagesModel.find().lean();
    return result;
  };

  saveMessage = async (message) => {
    let result = await MessagesModel.create(message);
    return result;
  };
}
