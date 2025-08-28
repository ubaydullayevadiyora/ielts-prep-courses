import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminAuthModule } from './admin/admin-auth.module';
import { UserAuthModule } from './user/user-auth.module';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    AdminAuthModule,
    UserAuthModule,
  ],
  providers: [AdminJwtStrategy, UserJwtStrategy],
})
export class AuthModule {}
