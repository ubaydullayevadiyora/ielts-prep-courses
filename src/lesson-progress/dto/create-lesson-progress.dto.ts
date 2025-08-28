import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonProgressDto {
  @IsNumber()
  @ApiProperty()
  enrollment_id: number;

  @IsNumber()
  @ApiProperty()
  lesson_id: number;

  @IsString()
  @ApiProperty()
  status: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ nullable: true })
  completed_at?: string;
}
