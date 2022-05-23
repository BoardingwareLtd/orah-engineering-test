import { generateStudents } from "shared/helpers/data-generation"
import { httpMock } from "shared/helpers/http-mock"
import { addIfNotExist, LocalStorageKey } from "shared/helpers/local-storage"
import { ApiResponse } from "shared/interfaces/http.interface"
import { Person } from "shared/models/person"
import { SearchParams } from "shared/interfaces/search.interface"
export async function getHomeboardStudents(params: SearchParams): Promise<ApiResponse<{ students: Person[] }>> {
  try {
    await httpMock({ randomFailure: true })
    return {
      success: true,
      students: generateStudents(14, params),
    }
  } catch (error) {
    return {
      success: false,
      error: {},
    }
  }
}
