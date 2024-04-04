import { IGetMessagesRepository, IGetMessagesController } from "./protocols";

export class GetUserController implements IGetMessagesController {
  constructor(private readonly getMessagesRespository: IGetMessagesRepository) {
    this.getMessagesRespository = getMessagesRespository;
  }

  async handle() {
    try {
      const users = await this.getMessagesRespository.getUsers();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "something went wrong",
      };
    }
  }
}
