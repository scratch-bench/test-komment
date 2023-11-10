// already documented
function test() {
    return true;
}

/**
* @description This function does nothing. It has no implementation body and only 
* contains a void return statement.
* 
* @returns { any } There is no output returned by the `other()` function because it 
* does not contain any statements that produce output.
*/
function other(delta) {
}

function lerp(left, right, delta) {
    return left * (1 - delta) + right * delta;
}

class Ticker {
/**
* @description This is a constructor function for an object.
* 
* @returns { object } The output returned by this function is undefined.
*/
    constructor() {
        this.count = 0;
    }
}

/**
 * also doced
 */
function fail() {
    return false;
}
