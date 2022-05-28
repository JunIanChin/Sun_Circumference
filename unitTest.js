const assert = require('assert');

function test_update_pi(old_pi_value,  new_pi_value){
    assert.notDeepStrictEqual(old_pi_value,null);
    assert.notDeepStrictEqual(new_pi_value,null);
    assert.deepStrictEqual(typeof(old_pi_value),'string');
    assert.deepStrictEqual(typeof(new_pi_value),'string');
    /*Since we're getting new precision, the latest pi value must always be larger than previous pi value*/
    assert.deepStrictEqual(old_pi_value.length,(new_pi_value.length -1));

    console.log(`${test_update_pi.name}: All test case passed`);
}

function test_reset_pi(current_s3_values){
    // Since we already know the default value, we just need to check if the data got uploaded is correct or not 
    /* default_params = {q : '60', r : '13440', t : '10080' , i : '3' , pi: '3'}; */
    assert.deepStrictEqual(parseInt(current_s3_values.q,10),60);
    assert.deepStrictEqual(parseInt(current_s3_values.r,10),13440);
    assert.deepStrictEqual(parseInt(current_s3_values.t,10),10080);
    assert.deepStrictEqual(parseInt(current_s3_values.i,10), 3);
    assert.deepStrictEqual(parseInt(current_s3_values.pi,10),3);

    console.log(`${test_reset_pi.name}: All test case passed`);
}

module.exports = {
    test_update_pi,
    test_reset_pi
}