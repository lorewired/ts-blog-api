import { Message } from "../../models/Message";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateMessageParams, ICreateMessageRepository } from "./protocols";

export class CreateMessageController implements IController {
   constructor(private readonly createMessageRepository: ICreateMessageRepository){
      this.createMessageRepository = createMessageRepository;
   }
   
   async handle(httpRequest: HttpRequest<CreateMessageParams>): Promise<HttpResponse<Message | string>>{
      try {
         const requiredFields = ["author", "text", "date"];
         const { body } = httpRequest;

         if (!body) return badRequest("body is required");

         for (const field of requiredFields) {
            if (!body[field].length) return badRequest(`${field} is missing`);
         }

         const message = await this.createMessageRepository.createMessage(body!);
         
         return ok(message);
      } catch (error) {
         return serverError();
      }
   }
}