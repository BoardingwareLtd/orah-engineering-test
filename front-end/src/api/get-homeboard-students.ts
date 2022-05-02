import { generateStudents } from "shared/helpers/data-generation"
import { httpMock } from "shared/helpers/http-mock"
import { addIfNotExist, LocalStorageKey } from "shared/helpers/local-storage"
import { ApiResponse } from "shared/interfaces/http.interface"
import { Person } from "shared/models/person"

export async function getHomeboardStudents(): Promise<ApiResponse<{ students: Person[] }>> {
  try {
    await httpMock({ randomFailure: true })
    return {
      success: true,
      students: addIfNotExist(LocalStorageKey.students, generateStudents(14)),
    }
  } catch (error) {
    return {
      success: false,
      error: {},
    }
  }
}
