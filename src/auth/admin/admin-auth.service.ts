// src/admin-auth/admin-auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../admin/entities/admin.entity';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AdminLoginDto } from './dto/admin-auth.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER
  async register(createAdminDto: CreateAdminDto) {
    const { email, password, username } = createAdminDto;

    // tekshirish: admin email band bo‘lmasin
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });
    if (existingAdmin) {
      throw new ConflictException('Admin already exists with this email');
    }

    // password hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // admin yaratish
    const newAdmin = this.adminRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await this.adminRepository.save(newAdmin);

    return {
      message: 'Admin registered successfully',
      admin: {
        id: savedAdmin.id,
        username: savedAdmin.username,
        email: savedAdmin.email,
      },
    };
  }

  // LOGIN
  async login(loginAdminDto: AdminLoginDto) {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // password check
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // token yaratish
    const payload = { sub: admin.id, email: admin.email, role: 'admin' };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken: token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    };
  }
}
