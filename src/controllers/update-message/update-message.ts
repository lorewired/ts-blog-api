import { Message } from "../../models/Message";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateMessageRepository, UpdateMessageParams } from "./protocols";

export class UpdateMessageController implements IController {
   constructor(private readonly updateMessageRepository: IUpdateMessageRepository){
      this.updateMessageRepository = updateMessageRepository;
   }

   async handle(httpRequest: HttpRequest<UpdateMessageParams>): Promise<HttpResponse<Message | string>> {
      try {
         const id = httpRequest.params?.id;
         const body = httpRequest.body;

         if (!id) return badRequest("id is required");
         if (!body) return badRequest("body is required");

         const message = await this.updateMessageRepository.updateMessage(id, body);
         
         return ok(message);
      } catch (error) {
         return serverError();
      }
   }
}