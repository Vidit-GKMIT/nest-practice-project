import { Controller, Get, Param, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { PaginationDto } from '../common/dto/pagnation.dto';
import { IdDto } from '../common/dto/entityId.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.departmentService.findAll(paginationDto);
  }

  @Get(':id/employees')
  async getAllEmployees(
    @Param() idDto: IdDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.departmentService.getAllEmployees(idDto, paginationDto);
  }
}
