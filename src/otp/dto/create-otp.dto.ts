import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({
    example: '998901234567',
    description: 'Phone number to send OTP',
  })
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;
}
