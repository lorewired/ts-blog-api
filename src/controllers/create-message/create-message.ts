import { Message } from "../../models/Message";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateMessageParams, ICreateMessageRepository } from "./protocols";

export class CreateMessageController implements IController {
   constructor(private readonly createMessageRepository: ICreateMessageRepository){
      this.createMessageRepository = createMessageRepository;
   }
   
   async handle(httpRequest: HttpRequest<CreateMessageParams>): Promise<HttpResponse<Message>>{
      try {
         const requiredFields = ["author", "text", "date"];
         const { body } = httpRequest;

         if (!body) return { statusCode: 400, body: "Please specify a body" }

         for (const field of requiredFields){
            if (!body[field]?.length){
               return {
                  statusCode: 400,
                  body: `Field ${field} is required`
               }
            }
         }

         const message = await this.createMessageRepository.createMessage(body!);
         
         return {
            statusCode: 201,
            body: message
         }
      } catch (error) {
         return {
            statusCode: 500,
            body: "something went wrong"
         }
      }
   }
}