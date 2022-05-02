export interface CreateStudentRollStateInput {
  student_id: number
  roll_id: number
  state: string
}

export interface UpdateStudentRollStateInput {
  id: number
  student_id: number
  roll_id: number
  state: string
}
