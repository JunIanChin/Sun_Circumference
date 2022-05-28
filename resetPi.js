const aws = require('aws-sdk');
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

const getPiPrecisionDefaultValue = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const defaultParams = {
                q : '60',
                r : '13440',
                t : '10080' ,
                i : '3' , 
                pi: '3'
            };
            return resolve(defaultParams);
        }
        catch(err) {
            return reject(err);
        }
    });
}

(async function main(){
    const s3QueryParams = {
        Bucket: process.env.S3_BUCKET_NAME, 
        Key: process.env.S3_BUCKET_KEY,
    };

    const s3_connector = new aws.S3(); 
    try {
        const getPiResetParams = await getPiPrecisionDefaultValue(); 
        const resetPiS3params = {
            ...s3QueryParams, 
            Body: JSON.stringify(getPiResetParams),
        };

        await s3_connector.putObject(resetPiS3params).promise();
    }
    catch(err) {
        console.log(err);
    }
    
})();

module.exports = {
    getPiPrecisionDefaultValue,
}