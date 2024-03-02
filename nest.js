
/**
 * @description This function defines a constant `Y` that always returns the value
 * `0`. It then returns the value of `Y()` directly, which is always `0`. In other
 * words, the function simply returns the value of a constant that always evaluates
 * to `0`.
 * 
 * @returns { number } The output of the function is `0`.
 */
const X = () => {
  /**
   * @description This function returns 0.
   * 
   * @returns { number } The function returns `0`.
   */
  const Y = () => {
    return 0;
  }

  return Y();
}
