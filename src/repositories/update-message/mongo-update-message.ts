import { ObjectId } from "mongodb";
import { IUpdateMessageRepository, UpdateMessageParams } from "../../controllers/update-message/protocols";
import { MongoClient } from "../../database/mongo";
import { Message } from "../../models/Message";

export class MongoUpdateMessageRepository implements IUpdateMessageRepository {
   async updateMessage(id: string, params: UpdateMessageParams): Promise<Message> {
      await MongoClient.db
         .collection("messages")
         .updateOne({_id: new ObjectId(id)}, {
            $set: {
               ...params
            }
         });

      const message = await MongoClient.db
         .collection<Omit<Message, "id">>("messages")
         .findOne({_id: new ObjectId(id)});

      if (!message) {
         throw new Error("Message not updated");
      }

      const { _id, ...rest } = message;
      return { id: _id.toHexString(), ...rest }
   }
}