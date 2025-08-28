import { IsNumber, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsNumber()
  @ApiProperty()
  course_id: number;

  @IsDateString()
  @ApiProperty()
  start_date: string;

  @IsDateString()
  @ApiProperty()
  end_date: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty()
  progress: number;
}
