
/**
* @description This function adds two numbers together and returns their sum.
* 
* @param {  } a - In the given function `add=(a、b)=>a+b`, the `a` input parameter
* is the first number to be added.
* 
* @param { number } b - The `b` input parameter adds the argument passed to the
* function when calling it and returns the sum of the `a` and `b`.
* 
* @returns { number } The function `add` takes two arguments `a` and `b`, and returns
* their sum. Therefore the output returned by this function is `a + b`.
*/
const add = (a, b) => a + b;

/**
* @description This function subtracts the second argument from the first and returns
* the result.
* 
* @param { number } a - The `a` input parameter represents the first operand of the
* subtraction operation and is subtracted from the `b` input parameter.
* 
* @param { number } b - In the given function subtract=() the input parameter "b"
* represents the subtrahend or the value that is being subtracted from the minuend(a).
* 
* @returns { number } The output returned by this function is `undefined`. This is
* because there is no `return` statement at the end of the function body. In JavaScript
* functions must have an explicit return statement to return a value. Without it the
* function will silently return undefined.
*/
const subtract = (a, b) => a - b;

/**
* @description This function is defined as `multiply = (a ,b) => a * b` and it
* performs the operation of multiplication between two numbers 'a' and 'b' and returns
* the result.
* 
* @param { number } a - In the function `multiply = (a , b) => a * b`, the `a` input
* parameter is used as the first operand for multiplication.
* 
* @param { number } b - In the provided arrow function `multiply`, the `b` input
* parameter is used as a factor to multiply with the `a` input parameter to return
* their product.
* 
* @returns { number } The function `multiply` takes two arguments `a` and `b`, and
* returns their product `a * b`. In other words、the output returned by this function
* is the result of multiplying `a` and `b`.
*/
const multiply = (a, b) => a * b;

/**
* @description This function divides the first argument (a) by the second argument
* (b), and returns the result of the division. It also throws an error if b is equal
* to zero.
* 
* @param { number } a - The `a` input parameter is the dividend that is being divided
* by the `b` parameter.
* 
* @param { number } b - In this function divide , the input parameter b serves as
* the divisor and determines the result of the division operation performed by the
* function.
* 
* @returns { number } The output returned by this function is a floating-point number
* calculated as `a/b`, but only if `b` is nonzero. If `b` is zero (`divide` will
* throw an error).
*/
const divide = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return a / b;
};

/**
* @description This function is named `pow` and it takes two arguments `base` and
* `exponent`. It returns the value of `Math.pow(base、exponent)`, which computes the
* value of `base` raised to the power of `exponent`.
* 
* @param { number } base - The `base` input parameter passed to `Math.pow()` inside
* the arrow function represents the number to be raised to a power.
* 
* @param { number } exponent - The `exponent` input parameter specifies the power
* to which the base should be raised. It is an integer that represents the number
* of times the base should be multiplied by itself.
* 
* @returns { number } This function takes two parameters `base` and `exponent`, and
* returns the result ofMath.pow(base pow).
* 
* In other words this is a simple function that wraps Math.pow() function. It doesn't
* change or manipulate the input at all and simply returns the result returned by
* the wrapped Math.pow function which is ( base ** exponent).
*/
const pow = (base, exponent) => Math.pow(base, exponent);

/**
* @description This function defines a custom `sqrt` function that checks if the
* input `number` is negative and throws an error if it is. If the input is positive
* or zero (i.e., not negative), it returns the square root of `number` using `Math.sqrt()`.
* 
* @param { number } number - The `number` input parameter is the value for which the
* square root should be calculated.
* 
* @returns { number } The output returned by this function is `undefined`. The
* function uses the `throw` statement to exit the function and throw an error when
* given a negative number as input.
*/
const sqrt = (number) => {
    if (number < 0) {
        throw new Error('Cannot calculate the square root of a negative number.');
    }
    return Math.sqrt(number);
};

const pi = Math.PI;

/**
* @description The function `circleArea` takes a single argument `radius` and returns
* the area of a circle with that given radius. It first checks if the input radius
* is negative and throws an error if it is. Then it uses the formula `pi * radius *
* radius` to calculate the area of the circle.
* 
* @param { number } radius - The `radius` input parameter determines the size of the
* circle and is used to calculate its area.
* 
* @returns { number } The output returned by this function is the area of a circle
* with the given radius. The function takes a single parameter `radius`, and it
* returns the area of the circle using the formula `pi * radius * radius`. If the
* `radius` is negative or zero , the function will throw an error. Otherwise , it
* will return a non -zero value for the area.
*/
const circleArea = (radius) => {
    if (radius < 0) {
        throw new Error('Radius cannot be negative.');
    }
    return pi * radius * radius;
};

/**
* @description This function calculates the area of a rectangle based on its length
* and width. It first checks if the inputs are negative and throws an error if so.
* If the inputs are valid (i.e., not negative), it returns the product of the length
* and width.
* 
* @param { number } length - In the provided function `rectangleArea`, the `length`
* input parameter specifies the length of the rectangle being calculated.
* 
* @param { number } width - The `width` input parameter multiplies the `length`
* parameter to calculate the area of a rectangle.
* 
* @returns { number } The output returned by this function is the product of the
* length and width of a rectangle given as inputs. If either length or width is
* negative. It throws an error indicating that the inputs cannot be negative. In
* other words: "Returns the area of a rectangle with positive dimensions."
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





// we definitely made a change