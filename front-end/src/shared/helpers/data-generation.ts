import { getRandomInt, generateRange } from "shared/helpers/math-utils"

const nameTokens = ["Alan", "John", "Brandon", "Key", "Branda", "Morris", "Carlos", "Lee"]

export function generateStudent(id: number) {
  return {
    id,
    first_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
    last_name: nameTokens[getRandomInt(0, nameTokens.length - 1)],
  }
}

function sortingByOrder(key: string, items: any) {
  let keyName = key ? key : "first_name"
  return items.sort(function (a: any, b: any) {
    const nameA = a[keyName].toUpperCase() // ignore upper and lowercase
    const nameB = b[keyName].toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}

export function generateStudents(number: number, params: any) {
  let data: any = generateRange(number).map((_, id) => generateStudent(id + 1))
  if (params && params.sortByName) {
    let sortData = sortingByOrder(params.sortByName, data)
    data = params.sortBy === "desc" ? sortData.reverse() : sortData
  }
  if (params && params.text) {
    let searchData = data.filter(
      (item: any) => item.first_name.toLowerCase().indexOf(params.text.toLowerCase()) > -1 || item.last_name.toLowerCase().indexOf(params.text.toLowerCase()) > -1
    )
    data = searchData
  }
  return data.length > 0 ? data : []
}
