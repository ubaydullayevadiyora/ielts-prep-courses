import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new admin' })
  @ApiResponse({ status: 201, description: 'Admin successfully registered' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiBody({ type: CreateAdminDto })
  async register(@Body() dto: CreateAdminDto) {
    return this.adminAuthService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 200, description: 'Admin successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.adminAuthService.login(dto);
  }
}
