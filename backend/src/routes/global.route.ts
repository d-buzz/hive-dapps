const router = require('express-promise-router')()
const { celebrate } = require('celebrate')
import * as controller from '../controllers/global.controller'

router.route('/')
  .get(controller.index)

export default router