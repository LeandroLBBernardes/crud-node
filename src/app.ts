import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose
      .connect(
        `mongodb+srv://leandrolbernardes:I7j75vQSPCCRZVqF@cluster0.5koh9b1.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
        console.log("server running on port 3333");
      })
      .catch((err) => console.log(err));
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
