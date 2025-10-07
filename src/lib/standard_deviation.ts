/**
 * Compute the population standard deviation of the given numbers.
 *
 * @param array - The numbers to analyze.
 * @returns The population standard deviation of `array`; returns 0 if `array` is empty.
 */
export function standardDeviation(array: number[]) {
  if (array.length === 0) {
    return 0;
  }
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) / (n)
  );
}