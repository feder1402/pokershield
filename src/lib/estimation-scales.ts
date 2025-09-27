export interface EstimationScale {
  id: string
  name: string
  values: string[]
  description: string
}

export const ESTIMATION_SCALES: EstimationScale[] = [
  {
    id: "fibonacci",
    name: "Fibonacci",
    values: ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "?", "☕"],
    description: "Classic Fibonacci sequence for story point estimation",
  },
  {
    id: "tshirt",
    name: "T-Shirt Sizes",
    values: ["XS", "S", "M", "L", "XL", "XXL", "?", "☕"],
    description: "T-shirt sizing for relative estimation",
  },
  {
    id: "powers-of-2",
    name: "Powers of 2",
    values: ["1", "2", "4", "8", "16", "32", "64", "?", "☕"],
    description: "Powers of 2 for technical complexity estimation",
  },
  {
    id: "linear",
    name: "Linear",
    values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "?", "☕"],
    description: "Linear scale for simple numeric estimation",
  },
  {
    id: "modified-fibonacci",
    name: "Modified Fibonacci",
    values: ["0", "0.5", "1", "2", "3", "5", "8", "13", "20", "40", "100", "?", "☕"],
    description: "Modified Fibonacci with half points and larger values",
  },
  {
    id: "risk",
    name: "Risk Assessment",
    values: ["Low", "Medium", "High", "Critical", "?", "☕"],
    description: "Risk-based estimation for project planning",
  },
]

export const getScaleById = (id: string): EstimationScale | undefined => {
  return ESTIMATION_SCALES.find((scale) => scale.id === id)
}

export const getScaleValues = (id: string): string[] => {
  const scale = getScaleById(id)
  return scale ? scale.values : ESTIMATION_SCALES[0].values
}
