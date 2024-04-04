import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(req.method, req.hostname, req.path);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, () => console.log("server listening on port " + port));
