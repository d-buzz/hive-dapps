import * as dotenv from "dotenv";
dotenv.config();
import * as dhive from "@hiveio/dhive";
//import * as hive from 'hive'
import _g = require("../_g");

const HISTORY_LIMIT = 500;
const VOTE_FETCH_LIMIT = 5000;

export var nodes = [
  "https://anyx.io",
  "https://api.hive.blog",
  "https://api.deathwing.me",
  "https://api.followbtcnews.com",
  "https://api.hivekings.com",
  "https://api.openhive.network",
  "https://api.pharesim.me",
  "https://hive.3speak.online",
  "https://hive.roelandp.nl",
  "https://hived.hive-engine.com",
  "https://hived.privex.io",
  "https://rpc.ausbit.dev",
  "https://rpc.esteem.app",
  "https://techcoderx.com",
];
export var current_node = nodes[0];

export var client = _g.USE_TESTNET
  ? dhive.Client.testnet()
  : new dhive.Client(current_node, { rebrandedApi: true });

export let get_account = async (name) => {
  let acc = await client.database.getAccounts([name]);
  return acc[0];
};

export async function get_accounts(names) {
  return await client.database.getAccounts(names);
}

export async function get_all_following(name) {
  let followers = await client.call("follow_api", "get_following", [
    name,
    -1,
    "blog",
    100,
  ]);
  let all_followers = followers.length > 0 ? followers : [];
  while (followers.length >= 99) {
    followers = await client.call("follow_api", "get_following", [
      name,
      followers[followers.length - 1].following,
      "blog",
      100,
    ]);
    followers.splice(0, 1);
    if (followers.length > 0) {
      all_followers.push.apply(all_followers, followers);
    }
  }
  return all_followers.map((a) => a.following);
}

export let update_global_properties = async () => {
  try {
    let properties = await client.call(
      "condenser_api",
      "get_dynamic_global_properties"
    );
    //let fund = await client.call('condenser_api', 'get_reward_fund', ['post'])
    let global_properties = {
      total_vesting_fund: parseFloat(
        properties.total_vesting_fund_hive.replace(" HIVE", "")
      ),
      total_vesting_shares: parseFloat(
        properties.total_vesting_shares.replace(" VESTS", "")
      ),
    };

    if (
      global_properties &&
      typeof global_properties.total_vesting_fund === "number"
    )
      _g.global_properties = global_properties;
  } catch (error) {
    console.error("update_global_properties", error);
  }
};
