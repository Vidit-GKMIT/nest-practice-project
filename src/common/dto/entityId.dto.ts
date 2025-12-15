import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class IdDto {
  @Type(() => Number)
  @IsNotEmpty({ message: 'Id is required.' })
  @IsInt({ message: 'Id must be an integer.' })
  @Min(1, { message: 'Id must be greater than 0.' })
  id: number;
}
