import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Department } from './department/entities/department.entity';
import { Employee } from './employee/entities/employee.entity';
import { Employee1766421095862 as EmployeeMigration } from './migrations/1766421095862-employee';
import { Department1766424052531 as DepartmentMigration } from './migrations/1766424052531-department';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: false,
  migrations: ['../build/migrations/*.js'],
  subscribers: [],
  entities: ['../build/**/entities/*.js'],
});
