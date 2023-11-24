
const add = (a, b) => a + b;
/**
* @description This function subtracts `a` from `b` and returns the result.
* 
* @param { number } a - In the given function `subtract = (a , b) => a - b`, the `a`
* input parameter is the first operand of the subtraction operation.
* 
* @param { number } b - The `b` input parameter represents the subtrahend (the number
* being subtracted from).
* 
* @returns {  } The function `subtract` takes two parameters `a` and `b`, and returns
* the difference of `a` and `b`.
* 
* So the output returned by this function is:
* 
* `a - b`
*/
const subtract = (a, b) => a - b;
/**
* @description The given function `multiply` takes two arguments `a` and `b` and
* returns their product (the result of multiplying `a` by `b`).
* 
* @param { number } a - In the given function `multiply = (a、b)=> a * b`, the `a`
* input parameter is multiplied by the `b` input parameter and the result is returned.
* 
* @param { number } b - The `b` input parameter is multiplied by the `a` input
* parameter to return their product.
* 
* @returns { number } The output returned by the function `multiply` with the input
* `([1], [2])` would be `[2]`.
*/
const multiply = (a, b) => a * b;
/**
* @description This function divide takes two arguments a and b and returns the
* result of dividing a by b if b is not equal to 0.
* 
* @param { number } a - In this function divide=((a ,b) =>{ if (b ===0) throw new
* Error('Division by zero is not allowed ');return a/b}); The variable a is an input
* parameter and serves as the dividend.
* 
* @param { number } b - The `b` input parameter checks whether the divisor is zero.
* 
* @returns { number } The output returned by this function is "NaN", which stands
* for "Not A Number".
*/
const divide = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return a / b;
};


/**
* @description This function takes two parameters `base` and `exponent`, and returns
* the result of raising `base` to the power of `exponent`, using the `Math.pow()` method.
* 
* @param { number } base - The `base` input parameter determines the number by which
* the exponent will be raised to produce the result.
* 
* @param { number } exponent - In the `pow` function you provided the `exponent`
* input parameter represents the number by which the `base` will be raised to a power.
* 
* @returns { number } The output returned by the function `pow` is the result of
* mathematically raising `base` to the power `exponent`. In other words. `Math.pow(base.
*/
const pow = (base, exponent) => Math.pow(base, exponent);
/**
* @description This function takes a single parameter `number`, and it calculates
* the square root of that number.
* 
* @param { number } number - In this function `sqrt`, the `number` input parameter
* is the argument to be passed to the `Math.sqrt()` method and will be used to
* calculate the square root.
* 
* @returns { number } The output returned by this function is `NaN` (Not a Number)
* for any negative input values because the `Math.sqrt()` method cannot be applied
* to negative numbers.
*/
const sqrt = (number) => {
    if (number < 0) {
        throw new Error('Cannot calculate the square root of a negative number.');
    }
    return Math.sqrt(number);
};

const pi = Math.PI;

/**
* @description This function calculates the area of a circle given a positive radius
* parameter using the formula: area = π x radius^2.
* 
* @param { number } radius - The `radius` input parameter passed to the `circleArea`
* function determines the size of the circle for which the area should be calculated.
* 
* @returns { number } The output returned by the function is the area of the circle
* with the given radius.
*/
const circleArea = (radius) => {
    if (radius < 0) {
        throw new Error('Radius cannot be negative.');
    }
    return pi * radius * radius;
};

/**
* @description The given function `rectangleArea` takes two parameters `length` and
* `width`, and it returns the area of a rectangle with those dimensions.
* 
* @param { number } length - The `length` input parameter defines the side of the
* rectangle that we're trying to find the area of.
* 
* @param { number } width - The `width` input parameter is used to calculate the
* product of the length and width to determine the area of a rectangle.
* 
* @returns { number } The output returned by this function is `length * width`.
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
