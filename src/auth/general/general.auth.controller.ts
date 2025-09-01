import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GeneralAuthService } from './general.auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { VerifyOtpDto } from '../../otp/dto/verify-otp.dto';
import { NewPasswordDto } from '../dto/new-password.dto';
import { Request, Response } from 'express';

@ApiTags('General Auth')
@Controller('general-auth')
export class GeneralAuthController {
  constructor(private readonly generalAuthService: GeneralAuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Universal user profile' })
  @ApiResponse({ status: 200, description: 'User profile info' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: Request & { user?: any }) {
    if (!req.user?.id || !req.user?.role) {
      throw new UnauthorizedException('User info not found in token');
    }
    return this.generalAuthService.getUniversalProfile(
      req.user.id,
      req.user.role,
    );
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: ForgetPasswordDto })
  async forgetPassword(@Body() dto: ForgetPasswordDto, @Res() res: Response) {
    return this.generalAuthService.forgetPassword(dto, res);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP code' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  @ApiBody({ type: VerifyOtpDto })
  async verifyOtp(@Req() req: Request, @Body() dto: VerifyOtpDto) {
    return this.generalAuthService.verifyOtp(dto, req);
  }

  @Post('new-password')
  @ApiOperation({ summary: 'Send new password' })
  @ApiResponse({
    status: 200,
    description: 'Your password successfully changed!',
  })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong or Passwords do not match',
  })
  @ApiBody({ type: NewPasswordDto })
  async newPassword(
    @Req() req: Request,
    @Body() dto: NewPasswordDto,
    @Res() res: Response,
  ) {
    return this.generalAuthService.newPassword(dto, req, res);
  }
}
