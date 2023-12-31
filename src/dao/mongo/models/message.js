import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = mongoose.Schema({
  user: { type: String, require: true },
  message: { type: String, require: true },
});

const MessagesModel = mongoose.model(messagesCollection, messagesSchema);

export default MessagesModel;
