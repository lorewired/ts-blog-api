import { IGetMessagesRepository } from "../../controllers/get-messages/protocols";
import { MongoClient } from "../../database/mongo";
import { Message } from "../../models/Message";

export class MongoGetMessagesRepository implements IGetMessagesRepository {
  async getUsers(): Promise<Message[]> {
    const messages = await MongoClient.db
      .collection<Omit<Message, "id">>("messages")
      .find({})
      .toArray();
    return messages.map(({_id, ...rest}) => ({...rest, id: _id.toHexString()})); // substituo o _id por id e converto pra string
  }
}
