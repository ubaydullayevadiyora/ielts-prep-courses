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
import { LoginDto } from '../dto/login.dto';

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

    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // admin create
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
  async login(loginAdminDto: LoginDto) {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: admin.id, email: admin.email, role: 'admin' };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      message: 'Login successful',
      tokens: { accessToken, refreshToken },
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    };
  }
}
