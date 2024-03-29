import * as celebrate from 'celebrate'
const Joi: any = celebrate.Joi

const socialSchema = Joi.object({
  github: Joi.string().allow(''),
  discord: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
  medium: Joi.string().allow(''),
  reddit: Joi.string().allow(''),
  telegram: Joi.string().allow('')
}).required()

const accountSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  benefactor: Joi.boolean(),
  curation: Joi.boolean(),
  transfer: Joi.boolean(),
  transfer_only_dau: Joi.boolean().allow(''),
  meta: Joi.boolean(),
  delegation: Joi.boolean(),
  posting: Joi.boolean(),
  logo: Joi.boolean(),
  account_creator: Joi.boolean(),
  account_types: Joi.array()
}).required()

export default {
  get_multiple: {
    query: Joi.object().keys({
      name: Joi.string(),
      type: Joi.string().valid('app', 'interface', 'steemengine', 'project', 'extension'),
      category: Joi.string(),
      all: Joi.boolean(),
      approved: Joi.boolean(),
      sort: Joi.string().valid('rank', 'dau', 'tx', 'volume_hbd', 'volume_hive', 'rewards_hbd', 'rewards_hive'),
      order: Joi.string().valid('asc', 'desc'),
      time: Joi.string().valid('last_day', 'last_week', 'last_month')
    })
  },
  get: {
    query: Joi.object().keys({
      name: Joi.string().required()
    })
  },
  submit: {
    body: Joi.object().keys({
      name: Joi.string().allow(''),
      display_name: Joi.string().required(),
      link: Joi.string().required(),
      ref_link: Joi.string().allow(''),
      logo: Joi.string().allow(''),
      product_screenshot: Joi.string().allow(''),
      description: Joi.string().required(),
      short_description: Joi.string().required(),
      status: Joi.string().required(),
      app_type: Joi.string().valid('app', 'interface', 'steemengine', 'project', 'extension').required(),
      category: Joi.string().required(),
      social: socialSchema,
      accounts: Joi.array().items(accountSchema).required(),
      custom_jsons: Joi.array().items(Joi.string()).required()
    })
  }
}