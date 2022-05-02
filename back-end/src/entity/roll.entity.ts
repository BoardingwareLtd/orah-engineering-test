import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { CreateRollInput, UpdateRollInput } from "../interface/roll.interface"

@Entity()
export class Roll {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  completed_at: Date

  public prepareToCreate(input: CreateRollInput) {
    this.name = input.name
    if (input.completed_at !== undefined) this.completed_at = input.completed_at
  }

  public prepareToUpdate(input: UpdateRollInput) {
    if (input.name !== undefined) this.name = input.name
    if (input.completed_at !== undefined) this.completed_at = input.completed_at
  }
}
