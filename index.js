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
        const getResetPiValues = reset_pi_handler.precision_default_value(); 
        const resetPiParams = {
            ...S3_PARAMS,
            Body: JSON.stringify(getResetPiValues),
        };

        await s3_connector.putObject(resetPiParams).promise(); 

        const successResp = {
            statusCode: HTTP_CODE.OK,
            body: HTTP_CODE.OK,
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

(async function main(){
    const s3_query_params = {
        Bucket: process.env.S3_BUCKET_NAME, 
        Key: process.env.S3_BUCKET_KEY,
    };

    const s3_connector = new aws.S3(); 
    try {
        const getData = await s3_connector.getObject(s3_query_params).promise(); 
        const transformedData = JSON.parse(getData.Body.toString('utf-8'));
        const updatedPiValue = await pi_handler.get_next_precision(transformedData);

        const updateS3Params = {
            ...s3_query_params,
            Body: JSON.stringify(updatedPiValue),
        };

        await s3_connector.putObject(updateS3Params).promise();
        console.log('Before', transformedData.pi, transformedData.pi.length);
        console.log('After', updatedPiValue.pi, updatedPiValue.pi.length);
        unitTesting.test_update_pi(transformedData.pi, updatedPiValue.pi);
    }
    catch(err) {
        console.log(err);
    }
    
})();