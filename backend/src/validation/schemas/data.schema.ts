import * as celebrate from 'celebrate'
const Joi: any = celebrate.Joi

import * as _g from '../../_g'

export default {
  get: {
    query: Joi.object().keys({
      app: Joi.string().required(),
      account: Joi.string(),
      data_type: Joi.string().valid(
        'volume_transfers_hbd', 'volume_transfers_hive', 'volume_meta',
        'tx_transfers_hbd', 'tx_transfers_hive', 'tx_custom', 'tx_meta',
        'dau_transfers_outgoing','dau_transfers_incoming', 'dau_benefactor', 'dau_transfers', 'dau_meta', 'dau_custom', 'dau_total',
        'rewards_benefactor_hbd', 'rewards_benefactor_hive', 'rewards_benefactor_vests', 'rewards_curation'
      ),
      detailed: Joi.boolean()
    })
  }
}