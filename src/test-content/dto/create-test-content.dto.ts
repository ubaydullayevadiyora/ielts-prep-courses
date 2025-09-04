import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'The ID of the related material' })
  material_id: number;

  @IsString()
  @ApiProperty({ example: 'IELTS Listening Practice Test 1' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This test covers basic listening skills.',
    required: false,
  })
  description?: string;
}
