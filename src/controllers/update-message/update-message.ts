import { Message } from "../../models/Message";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateMessageRepository, UpdateMessageParams } from "./protocols";

export class UpdateMessageController implements IController {
   constructor(private readonly updateMessageRepository: IUpdateMessageRepository){
      this.updateMessageRepository = updateMessageRepository;
   }

   async handle(httpRequest: HttpRequest<UpdateMessageParams>): Promise<HttpResponse<Message>> {
      try {
         const id = httpRequest.params?.id;
         const body = httpRequest.body;

         if (!id) return { statusCode: 400, body: "id is required" }
         if (!body) return { statusCode: 400, body: "body is required" }

         const allowedToUpdate: (keyof UpdateMessageParams)[] = ["author", "text"];

         const someFieldsIsNotAllowed = Object.keys(body)
            .some(key => !allowedToUpdate.includes(key as keyof UpdateMessageParams));

         if (someFieldsIsNotAllowed){
            return {
               statusCode: 400,
               body: "Some field is not allowed to update"
            }
         }

         const message = await this.updateMessageRepository.updateMessage(id, body);
         
         return {
            statusCode: 200,
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