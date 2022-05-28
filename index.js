const aws = require('aws-sdk');
const {HTTP_CODE, HTTP_MESSAGE, BUCKET_INFO} = require('./utils/constants');
const reset_pi_handler = require('./utils/resetPi');

const S3_PARAMS = {
    Bucket: BUCKET_INFO.BUCKET, 
    Key: BUCKET_INFO.KEY
};

exports.handler = async (event) => {
    console.log(event);

    // Only accept http method 'GET' , invoke through HTTP request
    if (event.requestContext.http.method !== 'GET') {
        const bad_method_resp = {
            statusCode: HTTP_CODE.BAD_REQUEST,
            body: HTTP_MESSAGE.BAD_REQUEST,
        }

        return bad_method_resp;
    }

    try {
        const s3_connector = new aws.S3(); 
        const getResetPiValues = await reset_pi_handler.precision_default_value(); 
        const resetPiParams = {
            ...S3_PARAMS,
            Body: JSON.stringify(getResetPiValues),
        };

        await s3_connector.putObject(resetPiParams).promise(); 

        const successResp = {
            statusCode: HTTP_CODE.OK,
            body: HTTP_MESSAGE.OK,
        };

        return successResp;
    }
    catch(err) {
        const server_error_resp = {
            statusCode: HTTP_CODE.INTERNAL_SERVER_ERROR,
            body: err.toString('utf-8'),
        };

        return server_error_resp;   
    }
};