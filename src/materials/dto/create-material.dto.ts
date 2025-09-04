import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export enum MaterialType {
  VIDEO = 'video',
  AUDIO = 'audio',
  TEST = 'test',
}

export class CreateMaterialDto {
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'Lesson ID to which this material belongs',
  })
  lesson_id: number;

  @IsString()
  @ApiProperty({ example: 'Present Simple Tense - Explanation' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This lesson covers the basics of Present Simple.',
    required: false,
  })
  description?: string;

  @IsEnum(MaterialType, {
    message: 'type must be one of: video, audio, test',
  })
  @ApiProperty({ enum: MaterialType, example: MaterialType.VIDEO })
  type: MaterialType;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://example.com/video.mp4', required: false })
  url?: string;

  @IsInt()
  @ApiProperty({ example: 1, description: 'Order number within the lesson' })
  order_number: number;
}
