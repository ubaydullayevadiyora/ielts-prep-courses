import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { User } from '../../users/entities/user.entity';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { Request, Response } from 'express';
import { OtpService } from '../../otp/otp.service';
import { VerifyOtpDto } from '../../otp/dto/verify-otp.dto';
import { decode } from '../../common/helpers/crypto';
import { Otp } from '../../otp/entities/otp.entity';
import { NewPasswordDto } from '../dto/new-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GeneralAuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>,

    private readonly otpService: OtpService,
  ) {}

  // Universal profile
  async getUniversalProfile(id: number, role: string) {
    switch (role) {
      case 'admin': {
        const admin = await this.adminRepo.findOne({ where: { id } });
        return { user: admin };
      }
      case 'user': {
        const user = await this.userRepo.findOne({ where: { id } });
        return { user };
      }
      default:
        throw new NotFoundException('Role noto‘g‘ri');
    }
  }

  // Forget Password → send OTP
  async forgetPassword(forgetPasswordDto: ForgetPasswordDto, res: Response) {
    const { email, role } = forgetPasswordDto;
    let otpData: any;

    switch (role) {
      case 'admin': {
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin) {
          throw new BadRequestException(`Admin with ${email} not found`);
        }
        otpData = await this.otpService.generateNewOtp(admin.email, role, res);
        break;
      }
      case 'user': {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
          throw new BadRequestException(`User with ${email} not found`);
        }
        otpData = await this.otpService.generateNewOtp(user.email, role, res);
        break;
      }
      default:
        throw new NotFoundException("Role noto'g'ri");
    }

    // Cookie o‘rnatish
    res.cookie('verification_key', otpData.verification_key, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });

    return {
      success: true,
      message: otpData.message,
    };
  }

  // Verify OTP
  async verifyOtp(verifyOtpDto: VerifyOtpDto, req: Request) {
    const verificationKey = req.cookies.verification_key;
    if (!verificationKey) {
      throw new BadRequestException('Verification key not found in cookies');
    }

    const decodedVerificationKey = await decode(verificationKey);
    const parsedOtpPayload = JSON.parse(decodedVerificationKey);

    const { otp } = verifyOtpDto;
    const otpDetails = await this.otpRepo.findOne({
      order: { createdAt: 'DESC' },
      where: { email: parsedOtpPayload.email },
    });

    if (!otpDetails) {
      throw new BadRequestException('OTP not found for this email');
    }

    const now = new Date();
    if (otpDetails.isVerified) {
      throw new BadRequestException('OTP already verified');
    }
    if (otpDetails.expiration_time < now) {
      throw new BadRequestException('OTP expired');
    }
    if (otpDetails.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.otpRepo.update({ id: otpDetails.id }, { isVerified: true });

    return { message: 'OTP verified, now you can set a new password' };
  }

  // New Password
  async newPassword(dto: NewPasswordDto, req: Request, res: Response) {
    const { confirm_password, password } = dto;

    if (confirm_password !== password) {
      throw new BadRequestException('Passwords do not match');
    }

    const verificationKey = req.cookies.verification_key;
    if (!verificationKey) {
      throw new BadRequestException('Verification key not found');
    }

    const decodedVerificationKey = await decode(verificationKey);
    const parsedOtpPayload = JSON.parse(decodedVerificationKey);

    switch (parsedOtpPayload.role) {
      case 'admin': {
        const admin = await this.adminRepo.findOne({
          where: { email: parsedOtpPayload.email },
        });
        if (!admin) throw new BadRequestException('Admin not found');

        admin.password = await bcrypt.hash(password, 10);
        await this.adminRepo.save(admin);
        break;
      }
      case 'user': {
        const user = await this.userRepo.findOne({
          where: { email: parsedOtpPayload.email },
        });
        if (!user) throw new BadRequestException('User not found');

        user.password = await bcrypt.hash(password, 10);
        await this.userRepo.save(user);
        break;
      }
      default:
        throw new BadRequestException('Invalid role');
    }

    res.clearCookie('verification_key');
    return {
      success: true,
      message: 'Password successfully changed!',
    };
  }
}
