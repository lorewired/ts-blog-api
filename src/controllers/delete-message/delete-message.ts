import { Message } from "../../models/Message";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteMessageRepository } from "./protocols";

export class DeleteMessageController implements IController {
   constructor(private readonly deleteMessageRepository: IDeleteMessageRepository){}

   async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<Message | string>> {
      try {
         const id = httpRequest?.params?.id;

         if (!id) return badRequest("id is required");

         const message = await this.deleteMessageRepository.deleteMessage(id);

         return ok(message);
      } catch (error){
         return serverError();
      }
   }
}