const getDefaultPiValue = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const default_params = {
                'q' : '60',
                'r' : '13440',
                't' : '10080' ,
                'i' : '3' , 
                'pi': '3',
            };
            return resolve(default_params);
        }
        catch(err) {
            return reject(err);
        }
    });
};

module.exports = {
    getDefaultPiValue,
};