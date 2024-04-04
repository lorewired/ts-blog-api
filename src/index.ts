import express from "express";
import { config } from "dotenv";
import { GetUserController } from "./controllers/get-messages/get-messages";
import { MongoGetMessagesRepository } from "./repositories/get-messages/mongo-get-messages";
import { MongoClient } from "./database/mongo";

config();

const port = process.env.PORT || 8080;

const main = async () => {
  const app = express();

  await MongoClient.connect();

  app.use((req, res, next) => {
    const time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, time);
    next();
  });
  
  app.get("/", (req, res) => {
    res.send("welcome");
  });
  
  app.get("/messages", async (req, res) => {
    const mongoGetMessagesRepository = new MongoGetMessagesRepository();
    const getMessagesController = new GetUserController(mongoGetMessagesRepository);
    const { statusCode, body } = await getMessagesController.handle();
    res.send(body).status(statusCode);
  });

  app.listen(port, () => {
    console.log(`listening on port: ${port}\n`);
  });
}

main();