import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class NewPasswordDto {
  @ApiProperty({
    example: 'NewP@ssw0rd456',
    description: 'New password of the user',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'NewP@ssw0rd456',
    description: 'Confirm new password (must match password)',
  })
  @IsNotEmpty()
  @Match('password', { message: 'Confirm password must match password' })
  confirm_password: string;
}
