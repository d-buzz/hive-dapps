export const USE_TESTNET = false
export const sql = require('mssql')
export let pool = null

export let hbd_dollar_price = 1
export let hive_dollar_price = 1
export let hbd_hive_ratio = 1

export let global_users = []
export let temp_global_data = {
  dau: { 
    last_day: [],
    before_last_day: [],
    last_week: [],
    before_last_week: [],
    last_month: [],
    before_last_month: [],
    last_month_array: []},
  volume: { hbd: [], hive: [] },
  tx: [],
  rewards: { hbd: [], hive: [] }
}
export let global_data = {
  dau: {
    last_day: 0,
    before_last_day: 0,
    last_week: 0,
    before_last_week: 0,
    last_month: 0,
    before_last_month: 0
  },
  volume: {
    hbd: {
      last_day: 0,
      before_last_day: 0,
      last_week: 0,
      before_last_week: 0,
      last_month: 0,
      before_last_month: 0
    },
    hive: {
      last_day: 0,
      before_last_day: 0,
      last_week: 0,
      before_last_week: 0,
      last_month: 0,
      before_last_month: 0
    }
  },
  tx: {
    last_day: 0,
    before_last_day: 0,
    last_week: 0,
    before_last_week: 0,
    last_month: 0,
    before_last_month: 0
  },
  rewards: { hbd: {}, hive: {} }
}

export let global_properties = {}

export const category = {
  games: 'games',
  entertainment: 'entertainment',
  exchanges: 'exchanges',
  development: 'development',
  gambling: 'gambling',
  wallet: 'wallet',
  finance: 'finance',
  promotion: 'promotion',
  social: 'social',
  media: 'media',
  security: 'security',
  utility: 'utility',
  interface: 'interface',
  education: 'education',
  health: 'health',
  content_discovery: 'content discovery'
}

export const data_type = {
  volume_transfers_hbd: 'volume_transfers_hbd',
  volume_transfers_hive: 'volume_transfers_hive',
  volume_meta: 'volume_meta',
  tx_transfers_hbd: 'tx_transfers_hbd',
  tx_transfers_hive: 'tx_transfers_hive',
  tx_custom: 'tx_custom',
  dau_transfers_outgoing: 'dau_transfers_outgoing',
  dau_transfers_incoming: 'dau_transfers_incoming',
  dau_benefactor: 'dau_benefactor',
  dau_transfers: 'dau_transfers',
  dau_meta: 'dau_meta',
  dau_custom: 'dau_custom',
  dau_vote_general: 'dau_vote_general',
  dau_total: 'dau_total',
  tx_meta: 'tx_meta',
  rewards_benefactor_hbd: 'rewards_benefactor_hbd',
  rewards_benefactor_hive: 'rewards_benefactor_hive',
  rewards_benefactor_vests: 'rewards_benefactor_vests',
  rewards_curation: 'rewards_curation'
}

export const app_type = {
  app: 'app',
  dapp: 'dapp',
  interface: 'interface'
}

export const tx_type = {
  vote: 'vote',
  transfer: 'transfer',
  //transfer_to_vesting: 'transfer_to_vesting',
  delegate: 'delegate'
  //follow: 'follow'
}

export const account_types = {
  transfer: 'transfer',
  benefactor: 'benefactor',
  curation: 'curation',
  transfer_only_dau: 'transfer_only_dau',
  delegation: 'delegation',
  meta: 'meta',
  posting: 'posting',
  logo: 'logo'
}

export const app_status = {
  live: 'live',
  beta: 'beta',
  alpha: 'alpha',
  workinprogress: 'work-in-progress',
  concept: 'concept',
  abandoned: 'abandoned'
}

export let processing_accounts = []
export let adding_votes = false

export let wait_sec = async (sec) => {
  return await Promise.all([
    timeout(sec * 1000)
  ])
}

export let wait_hour = async (hour) => {
  return await Promise.all([
    timeout(hour * 60 * 60 * 1000)
  ])
}

let timeout = (ms: any) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


