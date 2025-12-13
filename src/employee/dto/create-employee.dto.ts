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
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  salary: number;

  @IsEmail()
  @MaxLength(254)
  @IsNotEmpty()
  email: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  departmentId: number;
}
