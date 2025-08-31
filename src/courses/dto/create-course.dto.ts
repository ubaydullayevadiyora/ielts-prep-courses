import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  level: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  progress?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  lessons?: number;

  @IsString()
  @ApiProperty()
  status: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  month_access: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  duration: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  rating?: number;
}
