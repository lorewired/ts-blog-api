import { Message } from "../../models/Message";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteMessageRepository } from "./protocols";

export class DeleteMessageController implements IController {
   constructor(private readonly deleteMessageRepository: IDeleteMessageRepository){}

   async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Message>> {
      try {
         const id = httpRequest?.params?.id;

         if (!id){
            return {
               statusCode: 400,
               body: "id is required"
            }
         }

         const message = await this.deleteMessageRepository.deleteMessage(id);

         return {
            statusCode: 200,
            body: message
         }
      } catch (error){
         return {
            statusCode: 500,
            body: "something went wrong"
         }
      }
   }
}