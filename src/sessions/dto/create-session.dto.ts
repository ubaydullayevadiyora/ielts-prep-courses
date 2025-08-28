import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @IsNumber()
  @ApiProperty()
  unit_id: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  order_number: number;
}
