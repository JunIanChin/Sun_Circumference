const bigInt = require('./BigInteger');

/*
Algorithm used: streaming algorithm described by Jeremy Gibbons
https://www.cs.ox.ac.uk/people/jeremy.gibbons/publications/spigot.pdf
*/

function get_next_precision(previous_values) {
    return new Promise (async (resolve, reject) => {
        try {
            const values = {
                ...previous_values
            };
            Object.keys(values).forEach((key) => {
                // All values are in string form, convert to bigInt for calculation purpose 
                values[key] = bigInt(values[key]).value; 
            });
            const next_precision = ((values.i * 27n - 12n) * values.q + values.r * 5n) / (values.t * 5n);
            // update values needed for next iteration of get_next_precision 
            let u = values.i * 3n;
            u = (u + 1n) * 3n * (u + 2n);

            values.r = u * 10n * (values.q * (values.i * 5n -2n) + values.r - values.t * next_precision);
            values.q *= 10n * values.i * (values.i++ * 2n -1n);
            values.t *= u; 
            values.pi = bigInt(values.pi).toString().concat(bigInt(next_precision).toString());

            // Convert all values to string to retain accuracy 
            Object.keys(values).forEach((key) => {
                values[key] = bigInt(values[key]).toString();
            });
            return resolve(values);

        }
        catch(err) {
            console.log(err);
            return reject(err);
        }
    });
}

module.exports = {
    get_next_precision
}