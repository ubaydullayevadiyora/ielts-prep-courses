// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthModule } from './admin/admin-auth.module';
import { UserAuthModule } from './user/user-auth.module';
import { JwtStrategy } from './strategies/jwt-strategy';// 🔑 qo‘shish kerak

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // default jwt qilamiz
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    AdminAuthModule,
    UserAuthModule,
  ],
  providers: [JwtStrategy], // 🔑 bu yerda ro‘yxatdan o‘tadi
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
