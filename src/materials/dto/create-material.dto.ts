import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum MaterialType {
  VIDEO = 'video',
  AUDIO = 'audio',
  TEST = 'test',
  DOCUMENT = 'document', // qo‘shimcha, agar kerak bo‘lsa
}

export class CreateMaterialDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  lesson_id: number;

  @IsString()
  @ApiProperty({ example: 'Present Simple Tense - Explanation' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'This lesson covers the basics of Present Simple.' })
  description: string;

  @IsEnum(MaterialType, {
    message: 'type must be one of: video, audio, test, document',
  })
  @ApiProperty({ enum: MaterialType, example: MaterialType.VIDEO })
  type: MaterialType;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://example.com/video.mp4', required: false })
  url?: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  order_number: number;
}
