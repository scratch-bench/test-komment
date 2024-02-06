
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero is not allowed.');
    }
    return a / b;
};

const pow = (base, exponent) => Math.pow(base, exponent);

const sqrt = (number) => {
    if (number < 0) {
        throw new Error('Cannot calculate the square root of a negative number.');
    }
    return Math.sqrt(number);
};

const pi = Math.PI;

const circleArea = (radius) => {
    if (radius < 0) {
        throw new Error('Radius cannot be negative.');
    }
    return pi * radius * radius;
};

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



