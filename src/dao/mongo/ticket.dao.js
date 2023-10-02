import TicketModel from "./models/ticket.js";

export class TicketDaoMongo {
  async getTicket() {
    try {
      const result = await TicketModel.find();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getTicketById(tid) {
    try {
      const result = await TicketModel.findById(tid);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async createTicket(ticket) {
    try {
      const result = await TicketModel.create(ticket);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async resolveTicket(tid, ticket) {
    try {
      const result = await TicketModel.findByIdAndUpdate(tid, ticket);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
