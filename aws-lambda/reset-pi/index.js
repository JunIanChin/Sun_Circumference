const aws = require('aws-sdk')
const { HTTP_CODE, HTTP_MESSAGE, BUCKET_INFO } = require('./utils/constants')
const resetPiHandler = require('./utils/resetPi')

const S3_PARAMS = {
  Bucket: BUCKET_INFO.BUCKET,
  Key: BUCKET_INFO.KEY,
}

exports.handler = async (event) => {
  console.log(event)
  try {
    const s3Connector = new aws.S3()
    const getResetPiValues = await resetPiHandler.getDefaultPiValue()
    const resetPiParams = {
      ...S3_PARAMS,
      Body: JSON.stringify(getResetPiValues),
    }

    await s3Connector.putObject(resetPiParams).promise()

    const successResp = {
      statusCode: HTTP_CODE.OK,
      body: HTTP_MESSAGE.OK,
    }

    return successResp
  } catch (err) {
    const server_error_resp = {
      statusCode: HTTP_CODE.INTERNAL_SERVER_ERROR,
      body: err.toString('utf-8'),
    }

    return server_error_resp
  }
}
