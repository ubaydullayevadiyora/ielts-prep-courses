import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserAuthService } from './user-auth.service'
import { UserLoginDto } from './dto/user-auth.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userAuthService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: UserLoginDto) {
    return this.userAuthService.login(dto);
  }
}
