import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User first name', example: 'Ali' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'User last name', example: 'Valiyev' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (min 6 chars)',
    example: 'UserPass123!',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'User phone number (digits, optional +, 9–15 length)',
    example: '+998901234567',
  })
  @IsString()
  @Matches(/^\+?[0-9]{9,15}$/, {
    message: 'phone_number must be 9-15 digits, optional leading +',
  })
  phone_number: string;

  @ApiProperty({ description: 'Active status of the user', example: true })
  @IsBoolean()
  is_active: boolean;
}
