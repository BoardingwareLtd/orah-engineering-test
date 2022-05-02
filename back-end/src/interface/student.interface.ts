export interface CreateStudentInput {
  first_name: string
  last_name: string
  photo_url: string
}

export interface UpdateStudentInput {
  id: number
  first_name: string
  last_name: string
  photo_url: string
}
