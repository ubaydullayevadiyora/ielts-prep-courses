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

  @IsString()
  @ApiProperty()
  status: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  weeks: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  duration: number; // months_access

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  rating?: number;

  @IsString()
  @ApiProperty()
  lang: string;
}
