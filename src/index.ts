import express from "express";
import { config } from "dotenv";
import { GetUserController } from "./controllers/get-messages/get-messages";
import { MongoGetMessagesRepository, PostGresGetMessagesRepository } from "./repositories/get-messages/mongo-get-messages";

config();

const app = express();
const port = process.env.PORT || 8080;

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
  console.clear();
  console.log(`server listening on port ${port}\n`);
});
