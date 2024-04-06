import { Message } from "../../models/Message";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteMessageRepository {
   deleteMessage(id: string): Promise<Message>
}