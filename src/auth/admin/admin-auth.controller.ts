import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AdminLoginDto } from '../dto/admin-login.dto';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  // ===== CREATE NEW ADMIN (FAKAT SUPERADMIN) =====
  @Post('create-admin')
  @ApiOperation({ summary: 'Create a new admin (superadmin only)' })
  @ApiResponse({ status: 201, description: 'Admin successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden: not superadmin' })
  @ApiBody({ type: CreateAdminDto })
  async createAdmin(@Body() dto: CreateAdminDto, @Req() req: any) {
    // req.user = current logged-in admin (JWT guard orqali)
    const currentAdmin = req.user;
    return this.adminAuthService.createAdmin(dto, currentAdmin);
  }

  // ===== LOGIN =====
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 200, description: 'Admin successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: AdminLoginDto })
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }

  // ===== CHANGE PASSWORD =====
  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  @ApiOperation({ summary: 'Change admin password' })
  @ApiResponse({ status: 200, description: 'Password successfully changed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string' },
        newPassword: { type: 'string' },
      },
    },
  })
  async changePassword(
    @Req() req: any,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    const adminId = req.user.sub; // JWT guard orqali olingan admin ID
    return this.adminAuthService.changePassword(
      adminId,
      body.oldPassword,
      body.newPassword,
    );
  }
}
