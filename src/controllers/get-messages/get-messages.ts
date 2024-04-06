import { ok, serverError } from "../helpers";
import { IController } from "../protocols";
import { IGetMessagesRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getMessagesRespository: IGetMessagesRepository) {
    this.getMessagesRespository = getMessagesRespository;
  }

  async handle() {
    try {
      const users = await this.getMessagesRespository.getUsers();

      return ok(users);
    } catch (err) {
      return serverError();
    }
  }
}
