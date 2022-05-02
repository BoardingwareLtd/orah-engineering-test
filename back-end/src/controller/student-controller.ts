import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { Student } from "../entity/student.entity"
import { CreateStudentInput, UpdateStudentInput } from "../interface/student.interface"

export class StudentController {
  private studentRepository = getRepository(Student)

  async allStudents(request: Request, response: Response, next: NextFunction) {
    return this.studentRepository.find()
  }

  async createStudent(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request

    const createStudentInput: CreateStudentInput = {
      first_name: params.first_name,
      last_name: params.last_name,
      photo_url: params.photo_url,
    }
    const student = new Student()
    student.prepareToCreate(createStudentInput)

    return this.studentRepository.save(student)
  }

  async updateStudent(request: Request, response: Response, next: NextFunction) {
    const { body: params } = request

    this.studentRepository.findOne(params.id).then((student) => {
      const updateStudentInput: UpdateStudentInput = {
        id: params.id,
        first_name: params.first_name,
        last_name: params.last_name,
        photo_url: params.photo_url,
      }
      student.prepareToUpdate(updateStudentInput)

      return this.studentRepository.save(student)
    })
  }

  async removeStudent(request: Request, response: Response, next: NextFunction) {
    let studentToRemove = await this.studentRepository.findOne(request.params.id)
    await this.studentRepository.remove(studentToRemove)
  }
}
