import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import * as nodemailer from 'nodemailer';
import { Response } from 'express';

@Injectable()
export class OtpService {
  generateNewOtp(email: string, role: string, res: Response<any, Record<string, any>>): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  async sendOtp(email: string): Promise<string> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = this.otpRepository.create({
      email,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minut
    });

    await this.otpRepository.save(otp);

    // Email yuborish
    const transporter = nodemailer.createTransport({
      service: 'gmail', // yoki SMTP serveringiz
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });

    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otpCode}. It will expire in 5 minutes.`,
    });

    return 'OTP sent successfully to email!';
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<string> {
    const otpRecord = await this.otpRepository.findOne({
      where: { email: dto.email, otp: dto.otp },
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    otpRecord.isVerified = true;
    await this.otpRepository.save(otpRecord);

    return 'OTP verified successfully!';
  }
}
