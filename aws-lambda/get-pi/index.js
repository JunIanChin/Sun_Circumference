const aws = require('aws-sdk')
const {
  HTTP_CODE,
  HTTP_MESSAGE,
  BUCKET_INFO,
  SUN_INFO,
} = require('./utils/constants')
const nextPiHandler = require('./services/pi_algorithm')

const S3_PARAMS = {
  Bucket: BUCKET_INFO.BUCKET,
  Key: BUCKET_INFO.KEY,
}

exports.handler = async (event) => {
  try {
    const s3Connector = new aws.S3()
    const getCurrentPiData = await s3Connector.getObject(S3_PARAMS).promise()
    const newPiData = await nextPiHandler.getNextPrecision(
      JSON.parse(getCurrentPiData.Body.toString('utf-8')),
    )

    const updateParams = {
      ...S3_PARAMS,
      Body: JSON.stringify(newPiData),
    }

    await s3Connector.putObject(updateParams).promise()

    /* Return latest pi precision value and circumference of sun based on this value*/
    const decimalifiedPi = newPiData.pi
      .slice(0, 1)
      .concat('.')
      .concat(newPiData.pi.slice(1))
    const latestPiValue = parseFloat(decimalifiedPi)
    const sunCircumference = latestPiValue * parseFloat(SUN_INFO.DIAMETER)

    console.log(latestPiValue, sunCircumference)
    const queryResponse = {
      pi: decimalifiedPi,
      circumference: sunCircumference.toPrecision(50),
    }

    const response = {
      statusCode: HTTP_CODE.OK,
      body: JSON.stringify(queryResponse),
    }

    return response
  } catch (err) {
    const server_error_resp = {
      statusCode: HTTP_CODE.INTERNAL_SERVER_ERROR,
      body: err.toString('utf-8'),
    }

    return server_error_resp
  }
}
