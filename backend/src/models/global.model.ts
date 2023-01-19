import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  dau: {
    last_day: { type: Number, default: 0 },
    before_last_day: { type: Number, default: 0 },
    change_last_day: { type: Number, default: 0 },
    last_week: { type: Number, default: 0 },
    before_last_week: { type: Number, default: 0 },
    change_last_week: { type: Number, default: 0 },
    last_month: { type: Number, default: 0 },
    before_last_month: { type: Number, default: 0 },
    change_last_month: { type: Number, default: 0 }
  },
  volume: {
    hbd: {
      last_day: { type: Number, default: 0 },
      before_last_day: { type: Number, default: 0 },
      change_last_day: { type: Number, default: 0 },
      last_week: { type: Number, default: 0 },
      before_last_week: { type: Number, default: 0 },
      change_last_week: { type: Number, default: 0 },
      last_month: { type: Number, default: 0 },
      before_last_month: { type: Number, default: 0 },
      change_last_month: { type: Number, default: 0 }
    },
    hive: {
      last_day: { type: Number, default: 0 },
      before_last_day: { type: Number, default: 0 },
      change_last_day: { type: Number, default: 0 },
      last_week: { type: Number, default: 0 },
      before_last_week: { type: Number, default: 0 },
      change_last_week: { type: Number, default: 0 },
      last_month: { type: Number, default: 0 },
      before_last_month: { type: Number, default: 0 },
      change_last_month: { type: Number, default: 0 }
    },
    all: {
      last_day: { type: Number, default: 0 },
      before_last_day: { type: Number, default: 0 },
      change_last_day: { type: Number, default: 0 },
      last_week: { type: Number, default: 0 },
      before_last_week: { type: Number, default: 0 },
      change_last_week: { type: Number, default: 0 },
      last_month: { type: Number, default: 0 },
      before_last_month: { type: Number, default: 0 },
      change_last_month: { type: Number, default: 0 }
    }
  },
  tx: {
    last_day: { type: Number, default: 0 },
    before_last_day: { type: Number, default: 0 },
    change_last_day: { type: Number, default: 0 },
    last_week: { type: Number, default: 0 },
    before_last_week: { type: Number, default: 0 },
    change_last_week: { type: Number, default: 0 },
    last_month: { type: Number, default: 0 },
    before_last_month: { type: Number, default: 0 },
    change_last_month: { type: Number, default: 0 }
  },
  rewards: {
    hbd: {
      last_day: { type: Number, default: 0 },
      before_last_day: { type: Number, default: 0 },
      change_last_day: { type: Number, default: 0 },
      last_week: { type: Number, default: 0 },
      before_last_week: { type: Number, default: 0 },
      change_last_week: { type: Number, default: 0 },
      last_month: { type: Number, default: 0 },
      before_last_month: { type: Number, default: 0 },
      change_last_month: { type: Number, default: 0 }
    },
    hive: {
      last_day: { type: Number, default: 0 },
      before_last_day: { type: Number, default: 0 },
      change_last_day: { type: Number, default: 0 },
      last_week: { type: Number, default: 0 },
      before_last_week: { type: Number, default: 0 },
      change_last_week: { type: Number, default: 0 },
      last_month: { type: Number, default: 0 },
      before_last_month: { type: Number, default: 0 },
      change_last_month: { type: Number, default: 0 }
    }
  },
  created: { type: Date, required: true, default: Date.now },
  last_updated: { type: Date, required: true, default: Date.now }
})

export const Global = mongoose.model('global', schema)