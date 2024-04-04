import { Message } from "../../models/Message";
import HttpResponse from "../protocols";

export interface IGetMessagesController {
  handle(): Promise<HttpResponse<Message[]>>;
}

export interface IGetMessageRepository {
  getUsers(): Promise<Message[]>;
}
