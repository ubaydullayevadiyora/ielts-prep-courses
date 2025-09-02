import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@ApiTags('User Auth')
@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  // ===== REGISTER =====
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async register(@Body() dto: CreateUserDto) {
    return this.userAuthService.register(dto);
  }

  // ===== LOGIN =====
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user by email only' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in, returns JWT token',
  })
  @ApiResponse({ status: 401, description: 'User not found' })
  async login(@Body('email') email: string) {
    return this.userAuthService.login(email);
  }
}
