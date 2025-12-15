import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Department } from '../department/entities/department.entity';
import { PaginationDto } from '../common/dto/pagnation.dto';
import { IdDto } from '../common/dto/entityId.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const { name, salary, email, department } = createEmployeeDto;
    const departmentData = await this.departmentRepo.findOne({
      where: { name: department },
    });
    if (!departmentData) {
      throw new NotFoundException(`Department ${department} not found`);
    }

    console.log(departmentData);

    const employeeData = await this.employeeRepo.findOne({
      where: { email },
    });

    if (employeeData) {
      throw new ConflictException(`Employee with this email already exists`);
    }
    const employee = this.employeeRepo.create({
      name,
      salary,
      email,
      department: departmentData,
    });
    const data = await this.employeeRepo.save(employee);
    console.log(data);
    return {
      data: {
        id: data.id,
        name: data.name,
        salary: data.salary,
        email: data.email,
        department: {
          name: data.department.name,
        },
      },
      message: 'Data created successfully',
      success: true,
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    const [data, total] = await this.employeeRepo.findAndCount({
      relations: {
        department: true,
      },
      select: {
        id: true,
        name: true,
        salary: true,
        email: true,
        department: {
          name: true,
        },
      },
      take: limit,
      skip,
    });

    return {
      data,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: 'Data fetched successfully',
      success: true,
    };
  }

  async findOne(idDto: IdDto) {
    const data = await this.employeeRepo.findOne({
      where: {
        id: idDto.id,
      },
      relations: {
        department: true,
      },
      select: {
        id: true,
        name: true,
        salary: true,
        email: true,
        department: {
          name: true,
        },
      },
    });

    if (!data) {
      throw new NotFoundException(`No user with this id`);
    }

    return {
      data,
      message: 'Data fetched successfully',
      success: true,
    };
  }

  async update(idDto: IdDto, updateEmployeeDto: UpdateEmployeeDto) {
    const { name, salary, department } = updateEmployeeDto;
    const employee = await this.employeeRepo.findOne({
      where: { id: idDto.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee not found`);
    }

    const departmentData = await this.departmentRepo.findOne({
      where: { name: department },
    });

    if (!departmentData) {
      throw new NotFoundException(
        `Department ${updateEmployeeDto.department} not found`,
      );
    }
    await this.employeeRepo.update(idDto.id, {
      name,
      salary,
      department: departmentData,
    });
    return {
      message: 'Data updated successfully',
      success: true,
    };
  }

  async remove(idDto: IdDto) {
    const employee = await this.employeeRepo.findOne({
      where: { id: idDto.id },
    });
    console.log(employee);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    await this.employeeRepo.softDelete(idDto.id);
    return {
      message: 'Data deleted successfully',
      success: true,
    };
  }
}
