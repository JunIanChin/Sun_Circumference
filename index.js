const aws = require('aws-sdk');
const pi_handler = require('./pi_algorithm');
const unitTesting = require('./unitTest');
require('dotenv').config();

/*Local testing of s3 connection */
aws.config.update({
    region: 'ap-southeast-1', 
    apiVersion: 'latest', 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY, 
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }   
});

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
    }
    catch(err) {
        console.log(err);
    }
    
})();