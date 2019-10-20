import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async (): Promise<Db> => {
  const { databaseUser, databasePath, databasePassword } = config;

  const databaseURL = `mongodb://${databaseUser}:${databasePassword}@${databasePath}`;

  const connection = await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  return connection.connection.db;
};
