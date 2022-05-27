const aws = require('aws-sdk');
require('dotenv').config();

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
        console.log(JSON.parse(getData.Body.toString('utf-8')));
    }
    catch(err) {
        console.log(err);
    }
    
})();