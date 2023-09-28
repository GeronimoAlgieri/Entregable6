import mongoose from "mongoose";

const ticketCollection = "orders";

const ticketSchema = mongoose.Schema({
  code: {
    type: String,
    require: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    require: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    require: true,
  },
  purchaser: {
    type: String,
    require: true,
  },
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
