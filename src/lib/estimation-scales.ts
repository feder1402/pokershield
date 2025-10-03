export interface EstimationScale {
  id: string
  name: string
  description: string
  values: string[]
}

export const ESTIMATION_SCALES: EstimationScale[] = [
  {
    id: "fibonacci",
    name: "Fibonacci",
    description: "1, 2, 3, 5, 8, 13, 21, 34, 55, 89",
    values: ["1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "☕", "?"]
  },
  {
    id: "tshirt",
    name: "T-Shirt Sizes",
    description: "XS, S, M, L, XL",
    values: ["XS", "S", "M", "L", "XL", "?"]
  },
  {
    id: "powers-of-two",
    name: "Powers of Two",
    description: "1, 2, 4, 8, 16, 32",
    values: ["1", "2", "4", "8", "16", "32", "?"]
  },
  {
    id: "linear",
    name: "Linear",
    description: "1, 2, 3, 4, 5",
    values: ["1", "2", "3", "4", "5", "?"]
  },
  {
    id: "custom",
    name: "Custom",
    description: "Custom scale",
    values: ["1", "2", "3", "4", "5", "8", "13", "☕", "?"]
  }
]

export function getScaleById(scaleId: string): EstimationScale | undefined {
  return ESTIMATION_SCALES.find(scale => scale.id === scaleId)
}

export function getScaleValues(scaleId: string): string[] {
  const scale = getScaleById(scaleId)
  return scale ? scale.values : ESTIMATION_SCALES[0].values
}
