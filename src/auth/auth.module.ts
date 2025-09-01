import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Strategies & Guards
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// Controllers & Services
import { AdminAuthController } from './admin/admin-auth.controller';
import { AdminAuthService } from './admin/admin-auth.service';
import { UserAuthController } from './user/user-auth.controller';
import { UserAuthService } from './user/user-auth.service';

// Entities
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../users/entities/user.entity';


@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_KEY'),
        signOptions: {
          expiresIn: config.get<string>('ACCESS_TOKEN_TIME') || '1d',
        },
      }),
    }),
    TypeOrmModule.forFeature([Admin, User]),
  ],
  controllers: [AdminAuthController, UserAuthController],
  providers: [JwtStrategy, JwtAuthGuard, AdminAuthService, UserAuthService],
  exports: [JwtModule, PassportModule, JwtAuthGuard],
})
export class AuthModule {}
