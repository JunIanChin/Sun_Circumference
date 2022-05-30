const express = require('express')
const resetPiPrecision = require('../services/resetPi')
const { HTTP_CODE, HTTP_MESSAGE } = require('../utils/constants')
const router = express.Router()
require('../utils/constants')

router.get('/', async (req, res) => {
  const resetRes = await resetPiPrecision.resetPiPrecision()
  if (resetRes.statusCode === HTTP_CODE.INTERNAL_SERVER_ERROR) {
    res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .send(HTTP_MESSAGE.INTERNAL_SERVER_ERROR)
  } else {
    res.status(HTTP_CODE.OK).send(HTTP_MESSAGE.OK)
  }
})

module.exports = router
