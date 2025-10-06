/**
 * Calculate the standard deviation of an array of numbers
 * @param array - The array of numbers to calculate the standard deviation of
 * @returns The standard deviation of the array
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
