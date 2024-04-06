import { CreateMessageParams, ICreateMessageRepository } from "../../controllers/create-message/protocols";
import { MongoClient } from "../../database/mongo";
import { Message } from "../../models/Message";

export class MongoCreateMessageRepository implements ICreateMessageRepository {
   async createMessage(params: CreateMessageParams): Promise<Message>{
      const { insertedId } = await MongoClient.db
         .collection<Omit<Message, "id">>("messages")
         .insertOne(params);

      const message = await MongoClient.db
         .collection("messages")
         .findOne(insertedId);

      if (!message) {
         throw new Error("Message not created");
      }

      return message.map(({_id, ...rest}) => ({id: _id.toHexString(), ...rest}));
   }
}