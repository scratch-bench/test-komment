

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

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

