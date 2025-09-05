import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // ===== REGISTER =====
  async register(dto: CreateUserDto) {
    const { first_name, last_name, email, phone_number } = dto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException(`Bu email allaqachon ro'yxatdan o'tgan`);
    }

    const user = this.userRepository.create({
      first_name,
      last_name,
      email,
      phone_number,
    });

    await this.userRepository.save(user);

    return { message: `User muvaffaqiyatli ro'yxatdan o'tdi`, userId: user.id };
  }

  // ===== LOGIN =====
  async login(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const payload = { userId: user.id, email: user.email, role: 'user' };
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', token, user };
  }
}
