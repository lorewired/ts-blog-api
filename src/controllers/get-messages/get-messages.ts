import { IGetMessageRepository, IGetMessagesController } from "./protocols";

export class GetUserController implements IGetMessagesController {
  constructor(private readonly getUsersRepository: IGetMessageRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

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
