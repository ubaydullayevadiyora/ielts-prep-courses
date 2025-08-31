import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @IsNumber()
  @ApiProperty()
  session_id: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  order_number: number;
}
