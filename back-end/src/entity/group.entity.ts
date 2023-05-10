import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface"

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  number_of_weeks: number

  @Column()
  roll_states: string

  @Column()
  incidents: number

  @Column()
  ltmt: string

  @Column({
    nullable: true,
  })
  run_at: Date

  @Column({
    nullable: true,
  })
  student_count: number

  public prepareToCreate(input: CreateGroupInput) {
    this.name = input.name
    if (input.roll_states !== undefined) this.roll_states = input.roll_states
    if (input.incidents !== undefined) this.incidents = input.incidents
    if (input.ltmt !== undefined) this.ltmt = input.ltmt
    if (input.number_of_weeks !== undefined) this.number_of_weeks = input.number_of_weeks
  }
  public prepareToUpdate(input: UpdateGroupInput) {
    if (input.name !== undefined) this.name = input.name
    if (input.roll_states !== undefined) this.roll_states = input.roll_states
    if (input.incidents !== undefined) this.incidents = input.incidents
    if (input.ltmt !== undefined) this.ltmt = input.ltmt
    if (input.number_of_weeks !== undefined) this.number_of_weeks = input.number_of_weeks
  }
}
