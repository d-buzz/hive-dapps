import * as mongoose from "mongoose";
mongoose.Promise = global.Promise;
import * as dotenv from "dotenv";
dotenv.config();

import * as _g from "../_g";

export var external_db;

const MongoDBURI = () => {
  if (process.env.NODE_ENV === "development")
    return String(process.env.MONGODB_URI_DEV);

  const URI =
    process.env.NODE_ENV === "production"
      ? String(process.env.MONGODB_URI_PROD)
      : String(process.env.MONGODB_URI_STAGING);

  return `${URI}`;
};

const mongoDBConfigBasic = {
  // useCreateIndex: true,
  useNewUrlParser: true,
  // useUnifiedTopology: true,
};

export async function connect() {
  try {
    console.log("Connecting to DB...");
    if ((await mongoose.connection.readyState) === 1) {
      // not working
      await mongoose.connection.close();
    }

    // Local dev environment
    const config =
      process.env.NODE_ENV === "development"
        ? mongoDBConfigBasic
        : mongoDBConfigBasic;

    const connection = await mongoose.connect(MongoDBURI(), config);

    console.log("Successfully connected to DB");
    return connection;
  } catch (e) {
    console.error("db connect", e);
    await _g.wait_sec(10);
    return false;
  }
}
