import { NextFunction, Request, Response } from "express"

export class GroupController {

  async allGroups(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Return the list of all groups
  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Add a Group
  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Update a Group
  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Delete a Group
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
        
    // Return the list of Students that are in a Group
  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    // Task 2:
  
    // 1. Clear out the groups (delete all the students from the groups)

    // 2. For each group, query the student rolls to see which students match the filter for the group

    // 3. Add the list of students that match the filter to the group
  }
}
