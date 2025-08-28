import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

import { AdminLoginDto } from './dto/admin-auth.dto';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  // 🟢 Admin ro‘yxatdan o‘tadi
  @Post('register')
  async register(@Body() dto: CreateAdminDto) {
    return this.adminAuthService.register(dto);
  }

  // 🟢 Admin login qiladi
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }
}
