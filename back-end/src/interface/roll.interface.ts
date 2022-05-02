export interface CreateRollInput {
  name: string
  completed_at: Date
}

export interface UpdateRollInput {
  id: number
  name: string
  completed_at: Date
}
