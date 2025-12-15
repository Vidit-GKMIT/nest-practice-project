import { PickType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  isObject,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateEmployeeDto extends PickType(CreateEmployeeDto, [
  'name',
  'salary',
  'department',
]) {
  @IsOptional()
  @IsString({ message: 'Name should be string.' })
  @IsNotEmpty({ message: 'Name key should not be empty.' })
  @Length(2, 50, {
    message: 'Length of name should be between 2 (chars) to 50 (chars).',
  })
  name: string;

  @IsOptional()
  @IsInt({ message: 'Salary should be integer.' })
  @IsPositive({ message: 'Salary should be positive.' })
  @IsNotEmpty({ message: 'Salary key should not be empty.' })
  salary: number;

  @IsOptional()
  @IsString({ message: 'Department name should be string.' })
  @IsNotEmpty({ message: 'Department name key should not be empty.' })
  @MaxLength(25)
  department: string;
}
