const aws = require('aws-sdk')
const { SUN_INFO } = require('../utils/constants')
const nextPiHandler = require('./pi_algorithm')
require('dotenv').config()
require('../utils/constants')

/*Local testing of s3 connection */
aws.config.update({
  region: 'ap-southeast-1',
  apiVersion: 'latest',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
})

async function getNextPiPrecision() {
  const s3QueryParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: process.env.S3_BUCKET_KEY,
  }

  const s3Connector = new aws.S3()
  try {
    const currentPiData = await s3Connector.getObject(s3QueryParams).promise()
    const JSONifiedPiData = JSON.parse(currentPiData.Body.toString('utf-8'))
    const updatedPiValue = nextPiHandler.getNextPiPrecision(JSONifiedPiData)

    const updateS3Params = {
      ...s3QueryParams,
      Body: JSON.stringify(updatedPiValue),
    }

    await s3Connector.putObject(updateS3Params).promise()

    const decimalifiedPi = updatedPiValue.pi
      .slice(0, 1)
      .concat('.')
      .concat(updatedPiValue.pi.slice(1))
    const latestPiValue = parseFloat(decimalifiedPi)
    const sunCircumference = latestPiValue * parseFloat(SUN_INFO.DIAMETER)

    const queryResponse = {
      pi: decimalifiedPi,
      circumference: sunCircumference.toPrecision(50),
    }

    return queryResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = {
  getNextPiPrecision,
}
