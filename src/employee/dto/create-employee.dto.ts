import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString({ message: 'Name should be string.' })
  @IsNotEmpty({ message: 'Name key should not be empty.' })
  @Length(2, 50, {
    message: 'Length of name should be between 2 (chars) to 50 (chars).',
  })
  name: string;

  @IsInt({ message: 'Salary should be integer.' })
  @IsPositive({ message: 'Salary should be positive.' })
  @IsNotEmpty({ message: 'Salary key should not be empty.' })
  salary: number;

  @IsEmail()
  @MaxLength(254, { message: 'Max length of email should be 254.' })
  @IsNotEmpty({ message: 'Email key can not be empty.' })
  email: string;

  @IsString({ message: 'Department name should be string.' })
  @IsNotEmpty({ message: 'Department name key should not be empty.' })
  @MaxLength(25)
  department: string;
}
