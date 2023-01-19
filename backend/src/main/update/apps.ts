import {
  dau_meta,
  dau_transfers,
  dau_custom,
  dau_benefactor,
  dau_general,
} from "../queries/dau";
import { tx_custom, tx_meta, tx_transfers } from "../queries/tx";
import { volume_transfers } from "../queries/volume";
import { rewards_benefactor, rewards_curation } from "../queries/rewards";
import { vests_to_sp, get_change, add_values } from "../../helpers/convert";
import { update_global_properties } from "../../helpers/cast";
import { update_hivepower } from "./hive";
import * as db_app from "../../database/app.db";
import * as db_data from "../../database/data.db";
import * as db_global from "../../database/global.db";

import _g = require("../../_g");
import * as _ from "lodash";
import moment = require("moment");

const getQueryAsset = (asset) => {
  if (asset === "HIVE") return "HIVE";
  if (asset === "HBD") return "HBD";
  return asset;
};
export let update_data = async () => {
  // Update CUSTOM JSON DAU for 'vote', 'transfer' & 'delegate'
  const d = moment.utc().subtract(62, "d").toISOString();

  // let x = await Promise.all([
  //   dau_general("vote", d),
  //   dau_general("transfer", d),
  //   dau_general("delegate", d),
  //   dau_general("active_user", d),
  // ]);

  // dau_general('follow', d) # for the future

  let apps = await db_app.find_approved(true);
  for (let app of apps) {
    if (app.name !== "inji") continue;
    try {
      if (
        moment.utc().dayOfYear() <=
          moment.utc(app.last_update_data).dayOfYear() &&
        moment.utc().year() <= moment.utc(app.last_update_data).year()
      ) {
        // continue
      }

      let missing_days = 62; // moment.utc().dayOfYear() - moment.utc(app.last_update_data).dayOfYear()
      if (missing_days > 62) missing_days = 62;
      if (missing_days <= 0) missing_days = 0;
      let last_update_data = moment
        .utc()
        .subtract(missing_days + 2, "d")
        .toISOString();
      console.log("Updating data", app.name, last_update_data);
      for (let acc of app.accounts) {
        try {
          // Incoming Transfers
          if (acc.transfer || acc.transfer_only_dau) {
            if (!acc.transfer_only_dau) {
              for (let asset of ["HBD", "HIVE"]) {
                await volume_transfers(
                  app.name,
                  acc.name,
                  asset,
                  last_update_data
                );
                await tx_transfers(app.name, acc.name, asset, last_update_data);
              }
            }
            await dau_transfers(app.name, acc.name, last_update_data);
          }

          // Meta Object on Comments (Used by interfaces)
          if (acc.meta) {
            await tx_meta(app.name, acc.name, last_update_data);
            await dau_meta(app.name, acc.name, last_update_data);
          }

          // Benefactor Reward by Interfaces
          if (acc.benefactor) {
            await dau_benefactor(app.name, acc.name, last_update_data);
            for (let asset of ["HBD", "HIVE", "VESTS"]) {
              const queryAsset = getQueryAsset(asset);
              await rewards_benefactor(
                app.name,
                acc.name,
                asset,
                queryAsset,
                last_update_data
              );
            }
          }

          // Curation Rewards
          if (acc.curation) {
            await rewards_curation(app.name, acc.name, last_update_data);
          }
        } catch (error) {
          console.error("process_accounts", "update_data", error, acc.name);
        }
      }
      // Custom JSON
      let custom_dau = [];
      for (let custom of app.custom_jsons) {
        await tx_custom(app.name, custom, last_update_data);
        const _customs = await dau_custom(app.name, custom, last_update_data);
        custom_dau = custom_dau.concat(_customs);
      }

      // Creates the unique number of users for app
      await db_data.create_total_dau(app.name, custom_dau);

      app.last_update_data = moment.utc().toISOString();
      await app.save();
    } catch (error) {
      console.error("process_app", "update_data", error, app.name);
    }
  }
  console.log("Finished Update");
};

export let set_data = async () => {
  _g.temp_global_data = {
    dau: {
      last_day: [],
      before_last_day: [],
      last_week: [],
      before_last_week: [],
      last_month: [],
      before_last_month: [],
      last_month_array: [],
    },
    volume: { hbd: [], hive: [] },
    tx: [],
    rewards: { hbd: [], hive: [] },
  };
  await update_global_properties();
  let apps = await db_app.find_approved(true);
  for (let app of apps) {
    if (app.name !== "inji") continue;
    try {
      console.log("Setting data", app.name);
      let volume_hbd_container = [];
      let volume_hive_container = [];
      let dau_container = [];
      let tx_container = [];
      let rewards_hbd_container = [];
      let rewards_hive_container = [];
      let i = 0;
      for (let acc of app.accounts) {
        try {
          tx_container[i] = await update_tx(
            app.name,
            acc.name,
            app.custom_jsons
          );
          let volume = await update_volume(app.name, acc.name);

          let rewards = await update_rewards(app.name, acc.name);
          volume_hbd_container[i] = volume.hbd;
          volume_hive_container[i] = volume.hive;
          rewards_hbd_container[i] = rewards.hbd;
          rewards_hive_container[i] = rewards.hive;
        } catch (error) {
          console.error("set_data", app.name, error);
        }
        i += 1;
      }

      const values = {
        tx: add_values(tx_container),
        dau: await update_dau(app.name, ""),
        volume: {
          hbd: add_values(volume_hbd_container),
          hive: add_values(volume_hive_container),
        },
        rewards: {
          hbd: add_values(rewards_hbd_container),
          hive: add_values(rewards_hive_container),
        },
      };

      app.dau = values.dau;
      app.tx = values.tx;
      app.volume = values.volume;
      app.rewards = values.rewards;
      //app.last_update = moment.utc().toDate()
      await app.save();

      // Pushing app specific data for global data
      _g.temp_global_data.tx.push(values.tx);
      _g.temp_global_data.volume.hbd.push(values.volume.hbd);
      _g.temp_global_data.volume.hive.push(values.volume.hive);
      _g.temp_global_data.rewards.hbd.push(values.rewards.hbd);
      _g.temp_global_data.rewards.hive.push(values.rewards.hive);
      // Sets the Steempower values for App
      //await update_hivepower(app)
    } catch (error) {
      console.error("set_app", "set_data", error, app.name);
    }
  }

  const global_data = {
    dau: add_values([
      {
        last_day: _g.temp_global_data.dau.last_day,
        before_last_day: _g.temp_global_data.dau.before_last_day,
        // last_week: _g.temp_global_data.dau.last_week,
        // before_last_week: _g.temp_global_data.dau.before_last_week,
        // last_month: _g.temp_global_data.dau.last_month,
        // before_last_month: _g.temp_global_data.dau.before_last_month,
      },
    ]),
    tx: add_values(_g.temp_global_data.tx),
    volume: {
      hbd: add_values(_g.temp_global_data.volume.hbd),
      hive: add_values(_g.temp_global_data.volume.hive),
    },
    rewards: {
      hbd: add_values(_g.temp_global_data.rewards.hbd),
      hive: add_values(_g.temp_global_data.rewards.hive),
    },
  };

  await db_global.update_or_create(global_data);
  _g.global_data = global_data;
  console.log("Finished Data");
};

let get_date = async (
  app_name?: string,
  acc_name?: string,
  data_type?: string
) => {
  try {
    let x = {};
    for (let d of [
      "last_day",
      "before_last_day",
      "last_week",
      "before_last_week",
      "last_month",
      "before_last_month",
    ]) {
      x[d] = await db_data.get_sum_from_data(d, app_name, acc_name, data_type);

      if (
        data_type === _g.data_type.rewards_benefactor_vests ||
        data_type === _g.data_type.rewards_curation
      ) {
        x[d] = vests_to_sp(x[d], _g.global_properties);
      }
    }
    return x;
  } catch (error) {
    console.error("get_date", error, app_name);
  }
};

let get_date_dau = async (
  app_name?: string,
  acc_name?: string,
  data_type?: string
) => {
  try {
    let x = {};
    for (let d of [
      "last_day",
      "before_last_day",
      // "last_week",
      // "before_last_week",
      // "last_month",
      // "before_last_month",
    ]) {
      x[d] = await db_data.get_sum_from_data_dau(
        d,
        app_name,
        acc_name,
        data_type
      );
    }
    return x;
  } catch (error) {
    console.error("get_date", error, app_name);
  }
};

let update_dau = async (app_name, acc_name) => {
  try {
    const dau = [];
    dau[0] = await get_date_dau(app_name, acc_name, _g.data_type.dau_total);
    return add_values(dau);
  } catch (error) {
    console.error("update_dau", error, app_name);
  }
};

let update_volume = async (app_name, acc_name) => {
  try {
    const volume_hbd = [];
    const volume_hive = [];

    volume_hbd[0] = await get_date(
      app_name,
      acc_name,
      _g.data_type.volume_transfers_hbd
    );
    volume_hive[0] = await get_date(
      app_name,
      acc_name,
      _g.data_type.volume_transfers_hive
    );

    const hbd = add_values(volume_hbd);
    const hive = add_values(volume_hive);

    return { hbd, hive };
  } catch (error) {
    console.error("update_volume", error, app_name);
  }
};

let update_tx = async (app_name, acc_name, custom_jsons) => {
  try {
    const tx = [];
    tx[0] = await get_date(app_name, acc_name, _g.data_type.tx_transfers_hbd);
    tx[1] = await get_date(app_name, acc_name, _g.data_type.tx_transfers_hive);
    tx[2] = await get_date(app_name, acc_name, _g.data_type.tx_meta);
    let i = 2;
    for (let custom of custom_jsons) {
      i += 1;
      tx[i] = await get_date(app_name, custom, _g.data_type.tx_custom);
    }

    // Experimental for next Update
    /*db_data.get_last_month_array(app_name, [
      {
        keys: [acc_name],
        values: [_g.data_type.tx_transfers_hbd, _g.data_type.tx_transfers_hive, _g.data_type.tx_meta]
      },
      {
        keys: custom_jsons,
        values: [_g.data_type.tx_custom]
      }
    ])*/

    return add_values(tx);
  } catch (error) {
    console.error("update_tx", error, app_name);
  }
};

let update_rewards = async (app_name, acc_name) => {
  try {
    const rewards_hbd = [];
    const rewards_hive = [];
    const rewards_all = [];

    rewards_hbd[0] = await get_date(
      app_name,
      acc_name,
      _g.data_type.rewards_benefactor_hbd
    );

    rewards_hive[0] = await get_date(
      app_name,
      acc_name,
      _g.data_type.rewards_benefactor_hive
    );
    rewards_hive[1] = await get_date(
      app_name,
      acc_name,
      _g.data_type.rewards_benefactor_vests
    );
    rewards_hive[2] = await get_date(
      app_name,
      acc_name,
      _g.data_type.rewards_curation
    );

    const hbd = add_values(rewards_hbd);
    const hive = add_values(rewards_hive);
    return { hbd, hive };
  } catch (error) {
    console.error("update_rewards", error, app_name);
  }
};

const set_global_data = (data_type, when, data) => {
  let _data_type = data_type.substring(0, data_type.indexOf("_"));
  let _asset = data_type.includes("hbd")
    ? "hbd"
    : data_type.includes("hive") || data_type.includes("vests")
    ? "hive"
    : "";

  if (_data_type && _asset) {
    _g.global_data[_data_type][_asset][when] += data;
  } else {
    _g.global_data[_data_type][when] += data;
  }
};
