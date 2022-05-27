const assert = require('assert');

function test_update_pi(old_pi_value,  new_pi_value){
    assert(old_pi_value !== null);
    assert(new_pi_value !== null);
    assert(typeof(old_pi_value) === 'string');
    assert(typeof(new_pi_value) === 'string');
    /*Since we're getting new precision, the latest pi value must always be larger than previous pi value*/
    assert(old_pi_value.length === (new_pi_value.length -1));
}

module.exports = {
    test_update_pi
}