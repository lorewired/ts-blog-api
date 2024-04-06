import { Message } from "../../models/Message";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateMessageController {
   handle(httpRequest: HttpRequest<UpdateMessageParams>): Promise<HttpResponse<Message>>
}

export interface UpdateMessageParams {
   author?: string;
   text?: string;
}

export interface IUpdateMessageRepository {
   updateMessage(id: string, body: UpdateMessageParams): Promise<Message>
}