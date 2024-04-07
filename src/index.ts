import { config } from "dotenv";
import express from "express";
import { CreateMessageController } from "./controllers/create-message/create-message";
import { GetUserController } from "./controllers/get-messages/get-messages";
import { UpdateMessageController } from "./controllers/update-message/update-message";
import { MongoClient } from "./database/mongo";
import { MongoCreateMessageRepository } from "./repositories/create-message/mongo-create-message";
import { MongoGetMessagesRepository } from "./repositories/get-messages/mongo-get-messages";
import { MongoUpdateMessageRepository } from "./repositories/update-message/mongo-update-message";
import { MongoDeleteMessageRepository } from "./repositories/delete-message/mongo-delete-message";
import { DeleteMessageController } from "./controllers/delete-message/delete-message";
import cors from 'cors'

// load .env variables
config();

const port = process.env.PORT || 8080;

const main = async () => {
  const app = express();
  
  // wait mongo server connection
  await MongoClient.connect();
  
  // middleware convert body to json
  app.use(express.json());

  // middleware cors
  app.use(cors());

  // middleware logger
  app.use((req, res, next) => {
    const time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, time);
    next();
  });
  
  // methods handlers
  app.get("/messages", async (req, res) => {
    const mongoGetMessagesRepository = new MongoGetMessagesRepository();
    const getMessagesController = new GetUserController(mongoGetMessagesRepository);
    const { statusCode, body } = await getMessagesController.handle();
    res.status(statusCode).send(body);
  });

  app.post("/messages", async (req, res) => {
    const mongoCreateMessageRespository = new MongoCreateMessageRepository();
    const createMessageController = new CreateMessageController(mongoCreateMessageRespository);
    const { statusCode, body } = await createMessageController.handle({ body: req.body });
    res.status(statusCode).send(body);
  });

  app.patch("/messages/:id", async (req, res) => {
    const mongoUpdateMessageRepository = new MongoUpdateMessageRepository();
    const updateMessageController = new UpdateMessageController(mongoUpdateMessageRepository);
    const { statusCode, body } = await updateMessageController.handle({ params: req.params, body: req.body});
    res.status(statusCode).send(body);
  });

  app.delete("/messages/:id", async (req, res) => {
    const mongoDeleteMessageRepository = new MongoDeleteMessageRepository();
    const deleteMessageController = new DeleteMessageController(mongoDeleteMessageRepository);
    const { statusCode, body } = await deleteMessageController.handle({ params: req.params });
    res.status(statusCode).send(body);
  });

  // start server
  app.listen(port, () => {
    console.log(`listening on port: ${port}\n`);
  });
}

main();