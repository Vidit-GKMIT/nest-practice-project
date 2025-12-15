import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Department } from './department/entities/department.entity';
import { Employee } from './employee/entities/employee.entity';
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
  migrations: [],
  subscribers: [],
  entities: [Department, Employee],
});
