import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Repository } from 'typeorm';
import { Department } from '../department/entities/department.entity';
import { Employee } from './entities/employee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepo: Repository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: {
            findAndCount: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Department),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    employeeRepo = module.get<Repository<Employee>>(
      getRepositoryToken(Employee),
    );
  });

  it('should return all employees', async () => {
    const departmentData = {
      name: 'Technical',
    } as Department;
    const employees: Partial<Employee>[] = [
      {
        id: 9,
        name: 'Dikshant Sharma',
        salary: 10000,
        email: 'Dikshant@gmail.com',
        department: departmentData,
      },
    ];

    interface pageType {
      limit: number;
      page: number;
    }
    const obj: pageType = {
      limit: 10,
      page: 1,
    };

    jest
      .spyOn(employeeRepo, 'findAndCount')
      .mockResolvedValue([employees as Employee[], 1]);

    const result = await service.findAll(obj);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(employees);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(10);
    expect(service).toBeDefined();
  });

  it('should return one employee', async () => {
    const departmentData = {
      name: 'HR',
    } as Department;

    jest.spyOn(employeeRepo, 'findOne').mockResolvedValue({
      id: 8,
      name: 'Vidit78',
      salary: 10000,
      email: 'vidit@gmail.com',
      department: departmentData,
    } as Employee);

    interface iddto {
      id: number;
    }
    const obj: iddto = {
      id: 8,
    };

    const result = await service.findOne(obj);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Data fetched successfully');
    expect(result.success).toBe(true);
  });

  it('should return empty data when page and limit exceed total records', async () => {
    interface pageType {
      limit: number;
      page: number;
    }
    const obj: pageType = {
      limit: 10,
      page: 1,
    };
    jest.spyOn(employeeRepo, 'findAndCount').mockResolvedValue([[], 5]);
    const result = await service.findAll(obj);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
    expect(result.data.length).toBe(0);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(10);
  });
});
