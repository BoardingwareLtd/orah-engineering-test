import { useReducer, useCallback } from "react"
import { ApiResponse, ResponseError } from "shared/interfaces/http.interface"
import { RollInput } from "shared/models/roll"
import { getHomeboardStudents } from "api/get-homeboard-students"
import { getActivities } from "api/get-activities"
import { saveActiveRoll } from "api/save-active-roll"

interface Options {
  url: Endpoint
  initialLoadState?: LoadState
}
export function useApi<ReturnType = {}>({ url, initialLoadState = "loading" }: Options) {
  const [state, dispatch] = useReducer(stateReducer<ReturnType>(), { data: undefined, loadState: initialLoadState, error: undefined })
  const callApi = useCallback(
    async (params?: object) => {
      dispatch({ type: "loading" })

      function process(result: ApiResponse<ReturnType>) {
        if (result.success) {
          dispatch({ type: "success", result: result })
        } else if (result.error) {
          dispatch({ type: "error", error: result.error })
        }
      }

      switch (url) {
        case "get-homeboard-students":
          return getHomeboardStudents().then(process)
        case "get-activities":
          return getActivities().then(process)
        case "save-roll":
          return saveActiveRoll(params as RollInput).then(process)
      }
    },
    [url]
  )

  return [callApi, state.data, state.loadState, state.error] as const
}

/* use-api state reducer */
function stateReducer<T>() {
  return (state: ReducerState<T>, action: ReducerAction<T>): ReducerState<T> => {
    switch (action.type) {
      case "loading":
        return { ...state, loadState: "loading", error: undefined }
      case "success":
        return { ...state, loadState: "loaded", error: undefined, data: action.result }
      case "error":
        return { ...state, loadState: "error", error: action.error }
    }
  }
}
interface ReducerState<T> {
  data: T | undefined
  loadState: LoadState
  error: ResponseError | undefined
}
type ReducerAction<T> = { type: "success"; result: T } | { type: "error"; error: ResponseError } | { type: "loading" }

/* use-api options interfaces */
export type Endpoint = "get-homeboard-students" | "save-roll" | "get-activities"
export type LoadState = "unloaded" | "loading" | "loaded" | "error"
