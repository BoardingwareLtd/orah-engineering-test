import { getRandomInt } from "shared/helpers/math-utils"

interface Options {
  success?: boolean
  randomFailure?: boolean
}
export function httpMock({ success, randomFailure }: Options) {
  return new Promise<void>((resolve, reject) => {
    // resolves randomly between 200ms to 1000ms
    setTimeout(() => {
      if ((randomFailure && Math.random() < 0.99) || success) {
        resolve()
      } else {
        reject({ message: "Failed" })
      }
    }, getRandomInt(2, 10) * 100)
  })
}
