const bigInt = require('big-integer');

/*
Algorithm used: streaming algorithm described by Jeremy Gibbons
https://www.cs.ox.ac.uk/people/jeremy.gibbons/publications/spigot.pdf
*/

function getNextPiPrecision(previous_result) {
    return new Promise (async (resolve, reject) => {
        try {
            const result = {
                ...previous_result
            };
            Object.keys(result).forEach((key) => {
                // All result are in string form, convert to bigInt for calculation purpose 
                result[key] = bigInt(result[key]).value; 
            });
            const nextPiPrecision = ((result.i * 27n - 12n) * result.q + result.r * 5n) / (result.t * 5n);
            // update result needed for next iteration of get_next_precision 
            let u = result.i * 3n;
            u = (u + 1n) * 3n * (u + 2n);

            result.r = u * 10n * (result.q * (result.i * 5n -2n) + result.r - result.t * nextPiPrecision);
            result.q *= 10n * result.i * (result.i++ * 2n -1n);
            result.t *= u; 
            result.pi = bigInt(result.pi).toString().concat(bigInt(nextPiPrecision).toString());

            // Convert all result to string to retain accuracy 
            Object.keys(result).forEach((key) => {
                result[key] = bigInt(result[key]).toString();
            });
            return resolve(result);

        }
        catch(err) {
            console.log(err);
            return reject(err);
        }
    });
}

module.exports = {
    getNextPiPrecision
}