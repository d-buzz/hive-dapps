import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import * as db from "./helpers/database";
import * as mongoose from "mongoose";
import * as moment from "moment";

import { update_data, set_data } from "./main/update/apps";
import { update_rank } from "./main/update/rank";
import { convert_accepted_submissions } from "./main/submission/accept";
import { update_hbd_and_hive_price } from "./helpers/exchanges";
import { query } from "./main/queries/query";

import * as dau_query from "./main/queries/dau";

import * as db_app from "./database/app.db";
import * as db_data from "./database/data.db";
import * as db_global from "./database/global.db";

import { update_global_properties } from "./helpers/cast";
import { create_initial_apps } from "./main/update/initial";

import _g = require("./_g");

var connected = false;
var connection: any = {};

export var stop_bool = false;

let last_day = moment.utc().dayOfYear();
let startup = true;

const connection_config = {
  user: process.env.steemsql_user,
  password: process.env.steemsql_pw,
  server: process.env.steemsql_server,
  database: "DBHive", // TODO change to DBHive?
  connectionTimeout: 10000, // 5 Minutes
  requestTimeout: 1000 * 60 * 60, // 5 Minutes
};

export let start = async () => {
  try {
    while (!connected) {
      await try_connection();
    }

    _g.pool = await new _g.sql.ConnectionPool(connection_config).connect();

    _g.global_data = await db_global.find();
    // if (process.env.NODE_ENV === "production") await clean_old_data_entries();
    main();
  } catch (e) {
    console.error("Main Error", e);
    await _g.wait_sec(10);
    if (e.message.includes("504")) {
      connection.close();
      start();
    } else {
      start();
    }
  }
};

const format_accounts = async () => {
  for (let app of await db_app.find_all()) {
    let accounts = [];

    for (let acc of app.accounts) {
      let new_acc = {
        id: app.accounts.indexOf(acc),
        name: acc.name,
        curation: acc.account_types.includes("curation"),
        transfer: acc.account_types.includes("transfer"),
        transfer_only_dau: acc.account_types.includes("transfer_only_dau"),
        meta: acc.account_types.includes("meta"),
        delegation: acc.account_types.includes("delegation"),
        posting: acc.account_types.includes("posting"),
      };
      accounts.push(new_acc);
      console.log(acc, new_acc);
    }
    app.accounts = accounts;
    app.save();
  }
};

let main = async () => {
  while (true) {
    try {
      await update_hbd_and_hive_price();
      let i = await convert_accepted_submissions();
      if (
        last_day !== moment.utc().dayOfYear() ||
        i > 0 ||
        (startup && process.env.NODE_ENV === "production")
      ) {
        if (last_day !== moment.utc().dayOfYear())
          last_day = moment.utc().dayOfYear();
        startup = false;

        // Update Global Properties for calculation of Vests to Steempower
        console.log("update_global_properties");
        await update_global_properties();

        // Update the data from approved Apps
        console.log("update_data");
        await update_data();

        // Set the data from approved Apps
        console.log("set_data");
        await set_data();

        // Sets the rank for approved Apps
        console.log("update_rank");
        await update_rank();
      }
      console.log("Finished round - waiting 0.2 hours");
      await _g.wait_hour(0.2);
    } catch (error) {
      console.error("main", error);
      await _g.wait_sec(10);
      main();
    }
  }
};

let try_connection = async () => {
  if (mongoose.connection.readyState === 1) {
    connected = true;
    //log.notif('Successfully connected to DB')
  } else {
    connected = false;
    connection = await db.connect();
  }
};

const clean_old_data_entries = async () => {
  console.log("Cleaning up entries");
  // Detailed /w users
  await do_cleaning(await db_data.find_intern());

  // Lean w/o users
  await do_cleaning(await db_data.find_extern());
  console.log("Finished cleanup");
};

const do_cleaning = async (data_objects) => {
  const days = 62;
  for (const o of data_objects) {
    const data = [];
    for (let d of o.data) {
      if (
        moment.utc(d.timestamp).valueOf() >=
        moment.utc().subtract(days, "d").valueOf()
      ) {
        data.push(d);
      }
    }
    o.data = data;
    o.markModified("data");
    await o.save();
  }
};
