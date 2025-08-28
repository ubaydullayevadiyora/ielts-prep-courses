import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Unique username for the admin',
    example: 'superadmin',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Admin password (min 6 chars)',
    example: 'StrongPass123!',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Creator flag (super admin)', example: true })
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({ description: 'Active status of the admin', example: true })
  @IsBoolean()
  is_active: boolean;
}
