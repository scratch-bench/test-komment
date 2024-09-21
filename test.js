/**
 * @description Returns another function. When invoked, the returned function calls
 * the `call` function. The returned function does not have any visible state or
 * behavior itself, it simply executes the provided `call` function when called.
 */
const fn = () => () => call();
