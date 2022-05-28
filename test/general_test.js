const expect = require("chai").expect;
const aws = require('aws-sdk');
const bigInt = require('big-integer');
const pi_next_precision_handler = require('../pi_algorithm');
const pi_reset_precision_handler = require('../resetPi');
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

const s3_query_params = {
    Bucket: process.env.S3_BUCKET_NAME, 
    Key: process.env.S3_BUCKET_KEY,
};

const s3_connector = new aws.S3();

describe('Get next Pi precision value', function() {
    it ("Successfully gets value from S3 and types are correctly stored", async function() {
        const getData = await s3_connector.getObject(s3_query_params).promise(); 
        expect(getData).to.not.equal(null);
        const transformedData = JSON.parse(getData.Body.toString('utf-8'));
        expect(typeof(transformedData.q)).to.equal("string");
        expect(typeof(transformedData.r)).to.equal("string");
        expect(typeof(transformedData.t)).to.equal("string");
        expect(typeof(transformedData.i)).to.equal("string");
        expect(typeof(transformedData.pi)).to.equal("string");

    })
    it("Function get_next_precision should return correct values for next pi preicison", async function() {
        try {
            const transformedData = JSON.parse(getData.Body.toString('utf-8'));
            const updatedPiValue = await pi_next_precision_handler.get_next_precision(transformedData);

            /* Formula used in pi_algorithm.js*/
            let u = transformedData.i * 3n;
            u = (u + 1n) * 3n * (u + 2n);

            transformedData.r = u * 10n * (transformedData.q * (transformedData.i * 5n -2n) + transformedData.r - transformedData.t * next_precision);
            transformedData.q *= 10n * transformedData.i * (transformedData.i++ * 2n -1n);
            transformedData.t *= u; 
            transformedData.pi = bigInt(transformedData.pi).toString().concat(bigInt(next_precision).toString());

            expect(parseInt(updatedPiValue.q,10)).to.equal(bigInt(transformedData.q).toJSNumber());
            expect(parseInt(updatedPiValue.r,10)).to.equal(bigInt(transformedData.r).toJSNumber());
            expect(parseInt(updatedPiValue.t,10)).to.equal(bigInt(transformedData.t).toJSNumber());
            expect(parseInt(updatedPiValue.i,10)).to.equal(bigInt(transformedData.i).toJSNumber());
            expect(parseInt(updatedPiValue.pi,10)).to.equal(bigInt(transformedData.pi).toJSNumber());
        }
        catch(err) {
            return(err);
        }
    })
})

describe('Reset Pi value', function(){
    it('Function precision_default_value should return correct values', async function(){
        const resetPiValues = await pi_reset_precision_handler.precision_default_value(); 
        expect(parseInt(resetPiValues.q,10)).to.equal(60);
        expect(parseInt(resetPiValues.r,10)).to.equal(13440);
        expect(parseInt(resetPiValues.t,10)).to.equal(10080);
        expect(parseInt(resetPiValues.i,10)).to.equal(3);
        expect(parseInt(resetPiValues.pi,10)).to.equal(3);

    })
})

