import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('otps')
export class Otp {
  @ApiProperty({ example: 1, description: 'Unique identifier for OTP' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email associated with the OTP',
  })
  @Column()
  email: string;

  @ApiProperty({ example: '123456', description: 'Generated OTP code' })
  @Column()
  otp: string;

  @ApiProperty({ example: false, description: 'Whether OTP is verified' })
  @Column({ default: false })
  isVerified: boolean;

  @ApiProperty({
    example: '2025-08-31T19:30:00Z',
    description: 'OTP creation timestamp',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2025-08-31T19:35:00Z',
    description: 'OTP expiration timestamp',
  })
  @Column()
  expiresAt: Date;
  expiration_time: Date;
}
