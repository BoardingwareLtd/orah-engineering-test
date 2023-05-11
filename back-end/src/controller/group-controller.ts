import { NextFunction, Request, Response } from "express"
import { getRepository, MoreThan, In } from "typeorm"
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

  async allGroups(next: NextFunction) {
    try {
      return await this.groupRepository.find()
    } catch (error) {
      return next(error)
    }
  }

  async createGroup(request: Request, next: NextFunction) {
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

  async updateGroup(request: Request, next: NextFunction) {
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

  async removeGroup(request: Request, next: NextFunction) {
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

  async getGroupStudents(request: Request, next: NextFunction) {
    try {
      // Task 1:
      // Return the list of Students that are in a Group
      const { body: params } = request
      const group = await this.groupRepository.findOne(params.id)
      if (!group) {
        throw new Error("Group not found")
      }
      return await this.get_student_group_mapping(group)
    } catch (error) {
      return next(error)
    }
  }

  async runGroupFilters(next: NextFunction) {
    try {
      // 1. Clear out the groups (delete all the students from the groups)
      await this.studentGroupRepository.clear();

      // 2. For each group, query the student rolls to see which students match the filter for the group
      const groups = await this.groupRepository.find();
      const promises = groups.map(async (group) => {
        const studentgroupmapping = await this.get_student_group_mapping(group);
        // 3. Add the list of students that match the filter to the group
        await this.pushstudentgroupmapping_to_db(studentgroupmapping, group);
      });

      await Promise.all(promises);
      return await this.studentGroupRepository.find();
    } catch (error) {
      return next(error);
    }
  }


  private async get_student_group_mapping(group: Group) {
    const { number_of_weeks } = group
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - number_of_weeks * 7)

    const filtered_rolls = await this.rollRepository.find({
      where: {
        completed_at: MoreThan(fromDate),
      },
    })

    const rollIds = filtered_rolls.map((roll) => roll.id)
    const studentGroupMapping = await this.studentRollStateRepository.find({
      where: {
        roll_id: In(rollIds),
        state: In(group.roll_states.split(",")),
      },
    })

    return studentGroupMapping
  }

  private async pushstudentgroupmapping_to_db(studentgroupmapping: any[], group: Group) {
    const studentCounts = studentgroupmapping.reduce((counts, stdgrpmap) => {
      const studentId = stdgrpmap.student_id;
      counts[studentId] = (counts[studentId] || 0) + 1;
      return counts;
    }, {});

    const updatePromises = Object.entries(studentCounts).map(([key, value]) => {
      if (
        (group.ltmt === ltmtSymbols.GREATER_THAN && group.incidents < value) ||
        (group.ltmt === ltmtSymbols.LESS_THAN && group.incidents > value)
      ) {
        return this.pushtoStudentGroupHelper(Number(key), group.id, Number(value), studentgroupmapping.length);
      }
      return Promise.resolve();
    });

    await Promise.all(updatePromises);

  }

  private async pushtoStudentGroupHelper(student_id: number, group_id: number, count: number, groupstudentcount: number) {
    const createGroupStudentInput: CreateGroupStudentInput = {
      student_id: student_id,
      group_id: group_id,
      incident_count: count,
      run_at: new Date(),
      student_count: groupstudentcount,
    }
    const groupstudent = new GroupStudent()
    groupstudent.prepareToCreate(createGroupStudentInput)
    await this.studentGroupRepository.save(groupstudent)
  }
}
