import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../admin/entities/admin.entity';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { LoginDto } from '../dto/login.dto';
import { AdminLoginDto } from '../dto/admin-login.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // ===== CREATE NEW ADMIN (FAKAT SUPERADMIN) =====
  async createAdmin(createAdminDto: CreateAdminDto, currentAdmin: Admin) {
    console.log('currentAdmin:', currentAdmin);
    console.log('DTO:', createAdminDto);
    if (!currentAdmin.is_creator) {
      throw new ForbiddenException('Only superadmin can create new admins');
    }

    const { email, password, username } = createAdminDto;

    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });
    if (existingAdmin) {
      throw new ConflictException('Admin already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = this.adminRepository.create({
      username,
      email,
      password: hashedPassword,
      is_creator: false, // yangi adminlar faqat oddiy admin
    });

    const savedAdmin = await this.adminRepository.save(newAdmin);

    return {
      message: 'Admin created successfully',
      admin: {
        id: savedAdmin.id,
        username: savedAdmin.username,
        email: savedAdmin.email,
        is_creator: savedAdmin.is_creator,
      },
    };
  }

  // ===== LOGIN =====
  async login(loginAdminDto: AdminLoginDto) {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    const payload = {
      sub: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      message: 'Login successful',
      tokens: { accessToken, refreshToken },
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        is_creator: admin.is_creator,
      },
    };
  }

  // ===== CHANGE PASSWORD (ODDIY ADMIN / SUPERADMIN) =====
  async changePassword(
    adminId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin) throw new UnauthorizedException('Admin not found');

    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      admin.password,
    );
    if (!isOldPasswordValid)
      throw new UnauthorizedException('Old password is incorrect');

    admin.password = await bcrypt.hash(newPassword, 10);
    await this.adminRepository.save(admin);

    return { message: 'Password successfully changed' };
  }
}
