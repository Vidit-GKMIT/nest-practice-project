import { Controller, Get, Param, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.departmentService.findAll(+page, +limit);
  }

  @Get(':id/employees')
  async getAllEmployees(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.departmentService.getAllEmployees(+id, +page, +limit);
  }
}
