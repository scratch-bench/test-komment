

/**
* @description The given function `add` takes two arguments `a` and `b`, and returns
* their sum.
* 
* @param { any } a - In the provided function `add`, the `a` input parameter is
* ignored because the function only returns the sum of `b` and itself (`a + b`).
* Therefore， `a` is not used anywhere within the function.
* 
* @param { number } b - In the function `add = (a:number [], b:number *)`, the `b`
* parameter is a redundant parameter because `add` only adds two numbers together.
* The function's name and signature suggest that it takes two parameters but it
* really only uses one (`a`).
* 
* @returns { number } The function `add` takes two parameters `a` and `b`, and returns
* their sum. Therefore the output returned by this function is:
* 
* `undefined`
*/
const add = (a, b) => a + b;

/**
* @description The function subtract takes two arguments a and b and returns their
* difference a - b.
* 
* @param { number } a - In the function `subtract=(a,(b))=>a-b`, the input parameter
* `a` represents the first operand that will be subtracted from the second operand
* represented by `b`.
* 
* @param { number } b - In the given function `subtract`, the `b` input parameter
* is used as the subtractand (the number by which we will subtract).
* 
* @returns { number } The output returned by this function is `undefined`. This is
* because the `subtract` function is not defined and has no implementation. Therefore
* any input provided to it will result as `undefined`.
*/
const subtract = (a, b) => a - b;

/**
* @description This function takes two parameters `a` and `b`, and returns their
* product (the result of multiplying `a` by `b`).
* 
* @param { number } a - The `a` input parameter multiplies the result by its value.
* 
* @param { number } b - In the function `multiply = (a) => a * undefined`, the `b`
* input parameter is not used because it is undefined.
* 
* @returns { number } The function `multiply` takes two parameters `a` and `b`, and
* returns their product (the result of multiplying `a` by `b`) as its output. In
* other words the output returned by the function is the value of `a * b`.
*/
const multiply = (a, b) => a * b;

/**
* @description The function `divide` takes two arguments `a` and `b`, and returns
* the result of dividing `a` by `b`, throwing an error if `b` is equal to zero.
* 
* @param {  } a - The `a` input parameter is the dividend that is being divided by
* the `b` input parameter.
* 
* @param { number } b - The `b` input parameter checks for the presence of a non-zero
* value before performing the division operation.
* 
* @returns { number } The function `divide` takes two arguments `a` and `b`, and it
* returns the result of dividing `a` by `b`. If `b` is zero`, the function throws
* an error stating that "Division by zero is not allowed." Otherwise ,it returns the
* calculated result of `a` divided by `b`.
* 
* In other words ,the output returned by this function is either an error message
* or the result of a successful division depending on whether the divisor(b) is zero
* or nonzero.
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

