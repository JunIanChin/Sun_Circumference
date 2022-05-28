const aws = require('aws-sdk');
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

const precision_default_value = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const default_params = {
                q : '60',
                r : '13440',
                t : '10080' ,
                i : '3' , 
                pi: '3'
            };
            return resolve(default_params);
        }
        catch(err) {
            return reject(err);
        }
    });
}

(async function main(){
    const s3_query_params = {
        Bucket: process.env.S3_BUCKET_NAME, 
        Key: process.env.S3_BUCKET_KEY,
    };

    const s3_connector = new aws.S3(); 
    try {
        const getPiResetParams = await precision_default_value(); 
        const resetPiS3params = {
            ...s3_query_params, 
            Body: JSON.stringify(getPiResetParams),
        };
        await s3_connector.putObject(resetPiS3params).promise();

        const getData = await s3_connector.getObject(s3_query_params).promise(); 
        unitTesting.test_reset_pi(JSON.parse(getData.Body.toString('utf-8')));


    }
    catch(err) {
        console.log(err);
    }
    
})();

module.exports = {
    precision_default_value,
}