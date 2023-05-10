import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Group } from "../entity/group.entity";
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface";

export class GroupController {
  private groupRepository = getRepository(Group);

  async allGroups(request: Request, response: Response, next: NextFunction) {
    try {
      const groups = await this.groupRepository.find();
      return groups;
    } catch (error) {
      return next(error);
    }
  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    try {
      const { body: params } = request;

      const createGroupInput: CreateGroupInput = {
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
      };

      const group = new Group();
      group.prepareToCreate(createGroupInput);

      return await this.groupRepository.save(group);
    } catch (error) {
      return next(error);
    }
  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    try {
      const { body: params } = request;
      const group = await this.groupRepository.findOne(params.id);

      if (!group) {
        throw new Error("Group not found");
      }

      const updateRollInput: UpdateGroupInput = {
        id: params.id,
        name: params.name,
        number_of_weeks: params.number_of_weeks,
        roll_states: params.roll_states,
        incidents: params.incidents,
        ltmt: params.ltmt,
      };

      group.prepareToUpdate(updateRollInput);
      return await this.groupRepository.save(group);
    } catch (error) {
      return next(error);
    }
  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    try {
      const { body: params } = request;
      const group = await this.groupRepository.findOne(params.id);

      if (!group) {
        throw new Error("Group not found");
      }

      return await this.groupRepository.remove(group);
    } catch (error) {
      return next(error);
    }
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    try {
      // Task 1:
      // Return the list of Students that are in a Group
    } catch (error) {
      return next(error);
    }
  }

  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    try {
      // Task 2:
      // 1. Clear out the groups (delete all the students from the groups)

      // 2. For each group, query the student rolls to see which students match the filter for the group

      // 3. Add the list of students that match the filter to the group
    } catch (error) {
      return next(error);
    }
  }
}
