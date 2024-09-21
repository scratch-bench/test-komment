/**
 * @description Returns the value returned by the inner function `Y`. The `Y` function
 * simply returns a constant value, 0. When called, `X` evaluates to 0 due to the
 * nested execution flow.
 *
 * @returns {number} 0. This is because it calls another function `Y`, which also
 * returns a value of 0. The result of `Y` is then returned by `X`.
 */
const X = () => {
  /**
   * @description Immediately returns a value of zero without any input or processing.
   * It is a simple, pure function that always evaluates to the same output, making it
   * predictable and suitable for certain use cases where a default value is required.
   *
   * @returns {number} 0. This is a constant result that does not change. The returned
   * value is always zero.
   */
  const Y = () => {
    return 0;
  }

  return Y();
}
