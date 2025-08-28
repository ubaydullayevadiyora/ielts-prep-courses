import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_KEY'),
        signOptions: { expiresIn: config.get<string>('ACCESS_TOKEN_TIME') },
      }),
    }),
  ],
  providers: [UserAuthService],
  controllers: [UserAuthController],
  exports: [UserAuthService],
})
export class UserAuthModule {}
