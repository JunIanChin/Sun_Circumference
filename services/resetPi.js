const aws = require('aws-sdk')
const { HTTP_CODE, HTTP_MESSAGE } = require('../utils/constants')
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

const getPiPrecisionDefaultValue = () => {
  const defaultParams = {
    q: '60',
    r: '13440',
    t: '10080',
    i: '3',
    pi: '3',
  }
  return defaultParams
}

async function resetPiPrecision() {
  const s3QueryParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: process.env.S3_BUCKET_KEY,
  }

  const s3_connector = new aws.S3()
  try {
    const getPiResetParams = getPiPrecisionDefaultValue()
    const resetPiS3params = {
      ...s3QueryParams,
      Body: JSON.stringify(getPiResetParams),
    }

    await s3_connector.putObject(resetPiS3params).promise()
    return {
      statusCode: HTTP_CODE.OK,
      body: HTTP_MESSAGE.OK,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: HTTP_CODE.INTERNAL_SERVER_ERROR,
      body: HTTP_MESSAGE.INTERNAL_SERVER_ERROR,
    }
  }
}

module.exports = {
  resetPiPrecision,
  getPiPrecisionDefaultValue,
}
