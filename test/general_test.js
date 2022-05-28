const expect = require("chai").expect;
const bigInt = require('big-integer');
const nextPiHandler = require('../pi_algorithm');
const resetPiHandler = require('../resetPi');

describe('Function Test, get next Pi precision value', function() {
    it("Function get_nextPiPrecision should return correct transformedData for next pi preicison", async function() {
        // Initial pi data 
        const transformedData = {
            'q' : '60',
            'r' : '13440',
            't' : '10080' ,
            'i' : '3' , 
            'pi': '3'
        }

        const updatedPiValue = await nextPiHandler.getNextPiPrecision(transformedData);

        Object.keys(transformedData).forEach((key) => {
            transformedData[key] = bigInt(transformedData[key]).value
        });
        
        /* Formula used in pi_algorithm.js*/
        const nextPiPrecision = ((transformedData.i * 27n - 12n) * transformedData.q + transformedData.r * 5n) / (transformedData.t * 5n);
        let u = transformedData.i * 3n;
        u = (u + 1n) * 3n * (u + 2n);

        transformedData.r = u * 10n * (transformedData.q * (transformedData.i * 5n -2n) + transformedData.r - transformedData.t * nextPiPrecision);
        transformedData.q *= 10n * transformedData.i * (transformedData.i++ * 2n -1n);
        transformedData.t *= u; 
        transformedData.pi = bigInt(transformedData.pi).toString().concat(bigInt(nextPiPrecision).toString());

        expect(parseInt(updatedPiValue.q,10)).to.equal(bigInt(transformedData.q).toJSNumber());
        expect(parseInt(updatedPiValue.r,10)).to.equal(bigInt(transformedData.r).toJSNumber());
        expect(parseInt(updatedPiValue.t,10)).to.equal(bigInt(transformedData.t).toJSNumber());
        expect(parseInt(updatedPiValue.i,10)).to.equal(bigInt(transformedData.i).toJSNumber());
        expect(parseInt(updatedPiValue.pi,10)).to.equal(bigInt(transformedData.pi).toJSNumber());
    })
})

describe('Function test, reset Pi value', function(){
    it('Function precision_default_value should return correct transformedData', async function(){
        const resetPitransformedData = await resetPiHandler.getPiPrecisionDefaultValue(); 
        expect(parseInt(resetPitransformedData.q,10)).to.equal(60);
        expect(parseInt(resetPitransformedData.r,10)).to.equal(13440);
        expect(parseInt(resetPitransformedData.t,10)).to.equal(10080);
        expect(parseInt(resetPitransformedData.i,10)).to.equal(3);
        expect(parseInt(resetPitransformedData.pi,10)).to.equal(3);

    })
})

