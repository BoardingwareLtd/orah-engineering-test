import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class GroupStudent {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  student_id: number

  @Column()
  group_id: number

  @Column()
  incident_count: number


}
