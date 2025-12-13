import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';

@Entity('employees')
@Check(`"salary" >= 0`)
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column()
  salary: number;

  @Column({
    length: 254,
  })
  email: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
