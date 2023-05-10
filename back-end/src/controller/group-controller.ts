import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm"
import { GroupStudent } from "../entity/group-student.entity"
import { Group } from "../entity/group.entity"
import { Roll } from "../entity/roll.entity"
import { StudentRollState } from "../entity/student-roll-state.entity"
import { CreateGroupStudentInput } from "../interface/group-student.interface"
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface"
import { ltmtSymbols } from "../utils/enum"

export class GroupController {
  private groupRepository = getRepository(Group)
  private studentGroupRepository = getRepository(GroupStudent)
  private studentRollStateRepository = getRepository(StudentRollState)
  private rollRepository = getRepository(Roll)

  async allGroups(request: Request, response: Response, next: NextFunction) {
    try {
      const groups = await this.groupRepository.find()
      return groups
    } catch (error) {
      return next(error)
    }
  }

  async getgroupstudents(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.studentGroupRepository.find()
      // return groups;
    } catch (error) {
      return next(error)
    }
  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    try {
      const { body: params } = request

      const createGroupInput: CreateGroupInput = {
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
      }

      const group = new Group()
      group.prepareToCreate(createGroupInput)

      return await this.groupRepository.save(group)
    } catch (error) {
      return next(error)
    }
  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    try {
      const { body: params } = request
      const group = await this.groupRepository.findOne(params.id)

      if (!group) {
        throw new Error("Group not found")
      }

      const updateRollInput: UpdateGroupInput = {
        id: params.id,
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
      }

      group.prepareToUpdate(updateRollInput)
      return await this.groupRepository.save(group)
    } catch (error) {
      return next(error)
    }
  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    try {
      const { body: params } = request
      const group = await this.groupRepository.findOne(params.id)

      if (!group) {
        throw new Error("Group not found")
      }

      return await this.groupRepository.remove(group)
    } catch (error) {
      return next(error)
    }
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    try {
      // Task 1:
      // Return the list of Students that are in a Group
    } catch (error) {
      return next(error)
    }
  }

  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    try {
      // 1. Clear out the groups (delete all the students from the groups)
      const groupsstudents = await this.studentGroupRepository.find()
      groupsstudents.forEach(async (groupsstudent: GroupStudent) => {
        await this.studentGroupRepository.remove(groupsstudent)
      })

      // 2. For each group, query the student rolls to see which students match the filter for the group
      new Promise(async (resolve, reject) => {
        try {
          const groups = await this.groupRepository.find()
          const studentrolemapping = await this.studentRollStateRepository.find()
          const rolls = await this.rollRepository.find()
          const promises = groups.map(async (group) => {
            let studentgroupmapping = this.get_student_group_mapping(group, rolls, studentrolemapping)
            // 3. Add the list of students that match the filter to the group
            await this.pushstudentgroupmapping_to_db(studentgroupmapping, group)
          })

          await Promise.all(promises)
        } catch (error) {
          reject(error)
        }
      })
      return await this.studentGroupRepository.find()
    } catch (error) {
      return next(error)
    }
  }

  private get_student_group_mapping(group: Group, rolls: Roll[], studentrolemapping: StudentRollState[]) {
    let studentgroupmapping = []
    const { id, number_of_weeks, roll_states, incidents, ltmt } = group
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - number_of_weeks * 7)
    const filtered_rolls = rolls.filter((roll) => {
      return roll.completed_at >= fromDate
    })

    filtered_rolls.map((roll) => {
      const studentlist_in_roll = studentrolemapping.filter((stdrole) => {
        return stdrole.roll_id == roll.id && group.roll_states.split(",").includes(stdrole.state)
      })
      studentgroupmapping = [...studentgroupmapping, ...studentlist_in_roll]
    })
    return studentgroupmapping
  }

  private async pushstudentgroupmapping_to_db(studentgroupmapping: any[], group: Group) {
    const studentCounts = {}
    for (const stdgrpmap of studentgroupmapping) {
      const studentId = stdgrpmap.student_id
      studentCounts[studentId] = (studentCounts[studentId] || 0) + 1
    }
    Object.entries(studentCounts).forEach(async ([key, value]) => {
      if(group.ltmt===ltmtSymbols.GREATER_THAN && group.incidents<value)
        await this.pushtoStudentGroupHelper(Number(key), group.id, Number(value), studentgroupmapping.length)
      else if(group.ltmt===ltmtSymbols.LESS_THAN && group.incidents>value)
        await this.pushtoStudentGroupHelper(Number(key), group.id, Number(value), studentgroupmapping.length)
    })
  }

  private async pushtoStudentGroupHelper(student_id: number, group_id: number, count: number, groupstudentcount:number) {
    const createGroupStudentInput: CreateGroupStudentInput = {
      student_id: student_id,
      group_id: group_id,
      incident_count: count,
      run_at: new Date(),
      student_count: groupstudentcount
    }
    const groupstudent = new GroupStudent()
    groupstudent.prepareToCreate(createGroupStudentInput)
    await this.studentGroupRepository.save(groupstudent)
  }
}
