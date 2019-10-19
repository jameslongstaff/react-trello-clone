import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
import { cleanEnv, str, port } from "envalid";

export default async ({ expressApp }) => {
  // check env is set correctly
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    PORT: port()
  });

  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  // const userModel = {
  //   name: "userModel",
  //   // Notice the require syntax and the '.default'
  //   model: require("../models/user").default
  // };

  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });

  Logger.info("✌️ Express loaded");
};
