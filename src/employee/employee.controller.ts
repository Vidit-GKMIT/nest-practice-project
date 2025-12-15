import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from '../common/dto/pagnation.dto';
import { IdDto } from '../common/dto/entityId.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.employeeService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.employeeService.findOne(idDto);
  }

  @Patch(':id')
  update(@Param() idDto: IdDto, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(idDto, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param() idDto: IdDto) {
    return this.employeeService.remove(idDto);
  }
}
