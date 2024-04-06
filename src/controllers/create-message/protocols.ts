import { Message } from "../../models/Message";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateMessageController {
   handle(httpRequest: HttpRequest<CreateMessageParams>): Promise<HttpResponse<Message>>
}

export interface CreateMessageParams {
   author: string;
   text: string;
   date: string;
}

export interface ICreateMessageRepository {
   createMessage(params: CreateMessageParams): Promise<Message>
}