import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { Message } from "../../models/Message";
import { IDeleteMessageRepository } from "../../controllers/delete-message/protocols";

export class MongoDeleteMessageRepository implements IDeleteMessageRepository {
   async deleteMessage(id: string): Promise<Message>{
      const message = await MongoClient.db
         .collection<Omit<Message, "id">>("messages")
         .findOne({_id: new ObjectId(id)});

      if (!message) {
         throw new Error("Message not found");
      }
         
      const { deletedCount } = await MongoClient.db
         .collection("messages")
         .deleteOne({_id: new ObjectId(id)});

      if (!deletedCount){
         throw new Error("Message not deleted");
      }

      const {_id, ...rest} = message;
      return { id: _id.toHexString(), ...rest }
   }
} 