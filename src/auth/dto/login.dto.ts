import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'admin@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Transform(({ value }) => value?.trim()) 
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongPassword123!',
    required: true,
  })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Transform(({ value }) => value?.trim())
  password: string;

  @ApiProperty({
    description: 'The role of the user (e.g., admin, user)',
    example: 'admin',
    required: true,
  })
  @IsString({ message: 'Role must be a string' })
  @Transform(({ value }) => value?.trim().toLowerCase()) 
  role: string;
}
