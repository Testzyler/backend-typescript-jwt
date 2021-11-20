import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application, Response, Request } from "express";
import * as dotenv from "dotenv";
import morganMiddleware from "./lib/morganMiddleware";
import Logger from "./lib/logger";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

//initialize ENV variables
dotenv.config({ path: "./src/config/.development.env" });
const PORT = process.env.PORT;

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app: Application = express();

    //Call Middleware
    app.use(express.json());
    app.use(morganMiddleware);
    app.use(cors());
    app.use(helmet());
    app.use(morganMiddleware);

    app.get("/getstarted", (req: Request, res: Response) => {
      res
        .status(200)
        .send(
          "This is the tgemeplate of api using typescript express. Rules defind by eslint plugin prettier"
        );
    });

    //Set all routes from routes folder
    app.use("/", routes);

    Logger.info("Starting server..." + process.env.NODE_ENV);
    app.listen(PORT, () => Logger.debug(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
