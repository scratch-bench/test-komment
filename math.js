

/**
* @description The given function `add` takes two arguments `a` and `b`, and returns
* their sum. In other words:
* 
* `add(a++, b++) = a + b`.
* 
* @param { any } a - In the provided function `add=(a ,b)=> a+b`, the `a` input
* parameter is ignored and not used anywhere within the function body. Therefore it
* could be removed without affecting the functionality of the function.
* 
* @param { number } b - In the provided function `add = (a، b) => a + b`, the `b`
* input parameter adds the argument passed to the function with `a`.
* 
* @returns { number } The output of the function `add` with parameters `a=2` and
* `b=3` is `5`. This can be described as "2 plus 3 equals 5".
*/
const add = (a, b) => a + b;

/**
* @description The given function subtract() takes two arguments a and b and returns
* their difference.
* 
* @param { number } a - The `a` input parameter is the first operand to be subtracted.
* 
* @param { number } b - In the provided JavaScript function `subtract`, the `b` input
* parameter represents the subtrahend (the value that will be subtracted from the minuend).
* 
* @returns { number } The output returned by the function `subtract` with arguments
* `a = 5` and `b = 2` is `3`.
*/
const subtract = (a, b) => a - b;

/**
* @description This function is called `multiply` and it takes two arguments `a` and
* `b`. It returns the result of multiplying `a` and `b`, which is `a * b`.
* 
* @param { number } a - In the function `multiply = (a: any: number): number`:
* 
* The `a` parameter does not have any effect on the function's behavior and is ignored.
* 
* @param { number } b - The `b` input parameter multiplies the value of `a`.
* 
* @returns { number } The output returned by this function is `NaN`, as neither `a`
* nor `b` are defined.
*/
const multiply = (a, b) => a * b;

/**
* @description This function `divide` takes two parameters `a` and `b`, and it returns
* the result of dividing `a` by `b`, except if `b` is zero because then it throws
* an error with the message "Division by zero is not allowed.".
* 
* @param { number } a - The `a` input parameter is the dividend that will be divided
* by the `b` input parameter.
* 
* @param { number } b - In the function `divide`, the `b` input parameter is the divisor.
* 
* @returns { number } The output returned by this function is `a/b`, but only if `b`
* is non-zero. If `b` is zero: throws an Error "Division by zero is not allowed."`.
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

