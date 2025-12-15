import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { Repository, Timestamp } from 'typeorm';
import { Department } from './entities/department.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { NotFoundException } from '@nestjs/common';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let departmentRepo: Repository<Department>;
  let employeeRepo: Repository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: getRepositoryToken(Department),
          useValue: {
            findAndCount: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DepartmentService>(DepartmentService);
    departmentRepo = module.get<Repository<Department>>(
      getRepositoryToken(Department),
    );
  });

  it('should return departments', async () => {
    const departments: Partial<Department>[] = [
      {
        id: 1,
        name: 'HR',
        createdAt: new Date() as unknown as Timestamp,
        updatedAt: new Date() as unknown as Timestamp,
      },
    ];
    jest
      .spyOn(departmentRepo, 'findAndCount')
      .mockResolvedValue([departments as Department[], 1]);
    const result = await service.findAll(1, 10);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(departments);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(10);
  });

  it('should return all employees in any department', async () => {
    const departmentId = 1;
    const page = 1;
    const limit = 10;
    const department = {
      id: departmentId,
      name: 'HR',
    };
    const employees: Partial<Employee>[] = [
      {
        id: 9,
        name: 'Dikshant Sharma',
        salary: 10000,
        email: 'dikshant@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(departmentRepo, 'findOne').mockResolvedValue(department as any);
    jest
      .spyOn(employeeRepo, 'findAndCount')
      .mockResolvedValue([employees as Employee[], 1]);

    const result = await service.getAllEmployees(departmentId, page, limit);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(employees);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(10);
    expect(result.message).toBe('All employees fetched successfully');
  });
});
