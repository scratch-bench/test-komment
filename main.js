// already documented
/**
* @description This function returns `true`.
* 
* @returns { boolean } The output returned by the function `test()` is `true`.
*/
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

/**
* @description The function `lerp(left`,`right`,`delta`) takes three arguments: 
* `left`, `right`, and `delta`. It returns a value that is a linear interpolation 
* of `left` and `right`, where `delta` represents the proportion of `right` to blend 
* into `left`.
* 
* @param { number } left - The `left` input parameter determines the starting value 
* of the linear interpolation.
* 
* @param { any } right - The `right` input parameter of the `lerp` function is used 
* to determine the amount of blending between the `left` and the final result.
* 
* @param { number } delta - The `delta` input parameter controls the interpolation 
* between `left` and `right`, with higher values of `delta` resultingin a more rapidly 
* moving point towards the right value.
* 
* @returns { number } The output of the function `lerp` is a linear interpolation 
* between the values of `left` and `right`, with the interpolating factor being `delta`.
* 
* output = left * (1 - delta) + right * delta
*/
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
