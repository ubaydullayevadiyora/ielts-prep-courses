import { IsEmail, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user',
    description: 'User role (admin, user)',
    enum: ['admin', 'user'],
  })
  @IsIn(['admin', 'user'])
  role: string;
}
