/**
* @description The function `add` takes two arguments `a` and `b`, adds them together
* and returns the sum.
* 
* @param { number } a - The `a` input parameter adds its value to the result of the
* function when the function is called with two or more arguments.
* 
* @param { number } b - The `b` input parameter adds its value to the `a` value and
* returns their sum.
* 
* @returns { number } The output returned by the function `add` with the input `(3`,
* `4)` is `7`.
*/
const add = (a, b) => a + b;
/**
* @description The given function `subtract` takes two arguments `a` and `b`, and
* returns their difference `a - b`.
* 
* @param { number } a - In the function `subtract = (a`, `b`) => a - b`, the `a`
* input parameter is the first operand that is being subtracted from the second
* operand `b`.
* 
* @param { number } b - The `b` input parameter represents the value that is being
* subtracted from `a` within the function.
* 
* @returns {  } The output returned by the function `subtract` with arguments
* `undefined` and `10` would be `NaN`, as subtracting `undefined` from any number
* results Infinity.
*/
const subtract = (a, b) => a - b;
/**
* @description The function `multiply` takes two parameters `a` and `b`, and returns
* their product (i.e., `a * b`).
* 
* @param {  } a - The `a` input parameter is multiplied by the `b` input parameter
* within the function.
* 
* @param { number } b - The `b` input parameter is multiplied by the `a` input
* parameter inside the function.
* 
* @returns { number } The output returned by the function multiply(a.b) is 'NaN'.
*/
const multiply = (a, b) => a * b;
/**
* @description This function defines a curried division function `divide` that takes
* two arguments `a` and `b`. If `b` is equal to zero it throws an error "Division
* by zero is not allowed".
* 
* @param { any } a - In the given function `divide`, the `a` input parameter is the
* dividend that is being divided by the `b` input parameter (the divisor).
* 
* @param { number } b - In the given function `divide`, the `b` input parameter
* represents the divisor (the number by which we are dividing) and it is used to
* calculate the quotient (result of the division).
* 
* @returns { number } The output returned by this function is `a/b`, provided that
* `b` is non-zero.
*/
const divide = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return a / b;
};

/**
* @description This function calculates the mathematical exponent of base to the
* power of exponent.
* 
* @param { number } base - The `base` input parameter passed to the `Math.pow()`
* function inside the `pow` function determines the number to be raised to a power.
* 
* @param { number } exponent - The `exponent` input parameter is the power to which
* the `base` will be raised.
* 
* @returns { number } The output returned by the function `pow` is the result of
* calculating `Math.pow(base * exponent)`.
*/
const pow = (base, exponent) => Math.pow(base, exponent);
/**
* @description This function takes a number `number` and returns its square root if
* it is positive (i.e., greater than or equal to zero), otherwise it throws an error.
* 
* @param { number } number - The `number` input parameter is the value for which the
* square root will be calculated.
* 
* @returns { number } The output returned by this function is "Cannot calculate the
* square root of a negative number." when passed a negative number as an argument.
*/
const sqrt = (number) => {
    if (number < 0) {
        throw new Error('Cannot calculate the square root of a negative number.');
    }
    return Math.sqrt(number);
};

const pi = Math.PI;

/**
* @description The function `circleArea` takes a single argument `radius`, and returns
* the area of a circle with that radius.
* 
* @param { number } radius - The `radius` input parameter is a number that determines
* the size of the circle.
* 
* @returns { number } The output returned by this function is:
* 
* pi * radius * radius
*/
const circleArea = (radius) => {
    if (radius < 0) {
        throw new Error('Radius cannot be negative.');
    }
    return pi * radius * radius;
};

/**
* @description The function takes two arguments `length` and `width`, checks if they
* are negative or not and then returns the product of length and width if both are
* positive.
* 
* @param { number } length - In the function `rectangleArea`, the `length` input
* parameter determines the width of the rectangle being calculated.
* 
* @param { number } width - In the given function `rectangleArea`, the `width` input
* parameter determines the width of the rectangle that is being calculated.
* 
* @returns { number } The output returned by the function is `length * width`.
*/
const rectangleArea = (length, width) => {
    if (length < 0 || width < 0) {
        throw new Error('Length and width cannot be negative.');
    }
    return length * width;
};

export default {
    add,
    subtract,
    multiply,
    divide,
    pow,
    sqrt,
    pi,
    circleArea,
    rectangleArea
};

