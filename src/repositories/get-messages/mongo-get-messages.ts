import { IGetMessagesRepository } from "../../controllers/get-messages/protocols";
import { Message } from "../../models/Message";

export class MongoGetMessagesRepository implements IGetMessagesRepository {
  async getUsers(): Promise<Message[]> {
    return [{ author: "lolas", text: "hello chat!", date: "2024/04/04" }];
  }
}

export class PostGresGetMessagesRepository implements IGetMessagesRepository {
  async getUsers(): Promise<Message[]> {
    return [{ author: "ana", text: "oi lolas!", date: "2024/04/05" }];
  }
}
