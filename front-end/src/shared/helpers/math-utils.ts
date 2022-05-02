export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateRange = (length: number) => {
  const arr: number[] = []
  for (let i = 0; i < length; i++) {
    arr.push(i)
  }
  return arr
}
