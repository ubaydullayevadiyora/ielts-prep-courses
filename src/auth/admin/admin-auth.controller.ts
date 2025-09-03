import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  // ===== CREATE NEW ADMIN (FAKAT SUPERADMIN) =====
  @UseGuards(JwtAuthGuard) // 🔑 JWT guardni qo‘shdik
  @Post('create-admin')
  @ApiOperation({ summary: 'Create a new admin (superadmin only)' })
  @ApiResponse({ status: 201, description: 'Admin successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden: not superadmin' })
  @ApiBody({ type: CreateAdminDto })
  async createAdmin(@Body() dto: CreateAdminDto, @Req() req: any) {
    console.log('req.user:', req.user); // debug
    return this.adminAuthService.createAdmin(dto, req.user);
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
  @UseGuards(JwtAuthGuard) // 🔑 bu yerga ham qo‘shish kerak
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
    return this.adminAuthService.changePassword(
      req.user.sub,
      body.oldPassword,
      body.newPassword,
    );
  }
}
