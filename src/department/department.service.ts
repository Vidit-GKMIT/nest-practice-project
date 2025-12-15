import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { PaginationDto } from '../common/dto/pagnation.dto';
import { IdDto } from '../common/dto/entityId.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,

    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.departmentRepo.findAndCount({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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
      success: true,
      message: 'Departments fetched successfully',
    };
  }

  async getAllEmployees(idDto: IdDto, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const department = await this.departmentRepo.findOne({
      where: { id: idDto.id },
    });

    if (!department) {
      throw new NotFoundException(`Department not found`);
    }

    const skip = (page - 1) * limit;

    const [employeeData, total] = await this.employeeRepo.findAndCount({
      where: {
        department: { id: idDto.id },
      },
      take: limit,
      skip,
    });

    return {
      data: employeeData,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: 'All employees fetched successfully',
      success: true,
    };
  }
}
