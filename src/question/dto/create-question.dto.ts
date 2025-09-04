import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOptionDto {
  @IsString()
  @ApiProperty({ example: 'London' })
  text: string;

  @IsNumber()
  @ApiProperty({ example: 1, description: '1 = correct, 0 = incorrect' })
  is_correct: number;
}

export class CreateQuestionDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'ID of the test this question belongs to',
  })
  test_id: number;

  @IsString()
  @ApiProperty({ example: 'What is the capital of England?' })
  question_text: string;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'Order number of the question' })
  order_number: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  @ApiProperty({
    type: [CreateOptionDto],
    example: [
      { text: 'London', is_correct: 1 },
      { text: 'Paris', is_correct: 0 },
      { text: 'Berlin', is_correct: 0 },
    ],
  })
  options: CreateOptionDto[];
}
