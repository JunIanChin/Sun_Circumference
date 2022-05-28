const aws = require('aws-sdk');
const { HTTP_CODE, HTTP_MESSAGE, BUCKET_INFO, SUN_INFO } = require('./utils/constants');
const pi_get_next_precision_handler = require('./services/pi_algorithm');

const S3_PARAMS  = {
    Bucket: BUCKET_INFO.BUCKET,
    Key: BUCKET_INFO.KEY,
};

exports.handler = async (event) => {
    // Only accept http method 'GET' , invoke through HTTP request
    if (event.requestContext.http.method !== 'GET') {
        const bad_method_resp = {
            statusCode: HTTP_CODE.BAD_REQUEST,
            body: HTTP_MESSAGE.BAD_REQUEST
        }

        return bad_method_resp;
    }

    try {
        const s3_connector = new aws.S3(); 
        const getCurrentPiData = await s3_connector.getObject(S3_PARAMS).promise(); 
        const get_next_pi_precision = await pi_get_next_precision_handler.get_next_precision(JSON.parse(getCurrentPiData.Body.toString('utf-8')));

        const updateParams = {
            ...S3_PARAMS,
            Body: JSON.stringify(get_next_pi_precision),
        };
        
        await s3_connector.putObject(updateParams).promise();

        /* Return latest pi precision value and circumference of sun based on this value*/
        const decimalify_pi_value = (get_next_pi_precision.pi.slice(0,1).concat('.')).concat(get_next_pi_precision.pi.slice(1,));
        const latest_pi_precision = parseFloat(decimalify_pi_value);
        const sun_circumference = latest_pi_precision * parseFloat(SUN_INFO.DIAMETER); 
        
        console.log(latest_pi_precision, sun_circumference);
        const queryResponse = {
            pi: decimalify_pi_value,
            circumeference: sun_circumference.toPrecision(50),
        };

        const response = {
            statusCode: HTTP_CODE.OK,
            body: JSON.stringify(queryResponse),
        };

        return response;
    }
    catch(err) {
        const server_error_resp = {
            statusCode: HTTP_CODE.INTERNAL_SERVER_ERROR,
            body: err.toString('utf-8'),
        };

        return server_error_resp;
    }
};

