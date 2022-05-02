import { httpMock } from "shared/helpers/http-mock"
import { get, add, LocalStorageKey } from "shared/helpers/local-storage"
import { ApiResponse } from "shared/interfaces/http.interface"
import { Roll, RollInput } from "shared/models/roll"

export async function saveActiveRoll(roll: RollInput): Promise<ApiResponse<{}>> {
  try {
    const rollsInStorage = get<Roll[]>(LocalStorageKey.rolls)
    const newRollId = rollsInStorage !== undefined ? rollsInStorage[rollsInStorage.length - 1].id + 1 : 1
    const rollsToSave = rollsInStorage !== undefined ? [...rollsInStorage, createRoll(newRollId, roll)] : [createRoll(newRollId, roll)]
    add(LocalStorageKey.rolls, rollsToSave)

    await httpMock({ randomFailure: true })
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: {},
    }
  }
}

function createRoll(id: number, input: RollInput) {
  return {
    id,
    name: `Roll ${id}`,
    student_roll_states: input.student_roll_states,
    completed_at: new Date(),
  }
}
