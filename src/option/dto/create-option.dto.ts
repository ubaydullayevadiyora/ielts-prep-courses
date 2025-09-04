import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID of the related question' })
  question_id: number;

  @IsString()
  @ApiProperty({ example: 'London', description: 'Option text' })
  option_text: string;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'True if this option is the correct one',
  })
  is_correct: boolean;
}
