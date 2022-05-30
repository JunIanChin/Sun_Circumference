const express = require('express')
const getNextPiHandler = require('../services/getNextPi')
const { HTTP_CODE, HTTP_MESSAGE } = require('../utils/constants')
const router = express.Router()
require('../utils/constants')

router.get('/', async (req, res) => {
  const piData = await getNextPiHandler.getNextPiPrecision()
  if (piData === null) {
    res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .send(HTTP_MESSAGE.INTERNAL_SERVER_ERROR)
  } else {
    res.status(HTTP_CODE.OK).send(JSON.stringify(piData))
  }
})

module.exports = router
