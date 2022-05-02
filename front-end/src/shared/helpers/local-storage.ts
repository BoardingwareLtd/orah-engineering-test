export function add<T>(key: LocalStorageKey, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function addIfNotExist<T>(key: LocalStorageKey, value: T) {
  const itemInStore = get<T>(key)
  // add to local storage if not exist
  if (!itemInStore) {
    return add(key, value)
  }
  // return existing one
  return itemInStore
}

export function get<T>(key: LocalStorageKey) {
  const itemInStore = localStorage.getItem(key)
  return itemInStore ? (JSON.parse(itemInStore) as T) : undefined
}

export enum LocalStorageKey {
  students = "boardingware.students",
  rolls = "boardingware.rolls",
}
