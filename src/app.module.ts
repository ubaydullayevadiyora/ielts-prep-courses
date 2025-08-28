import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Admin } from './admin/entities/admin.entity';
import { User } from './users/entities/user.entity';
import { CourseModule } from './courses/courses.module';
import { UnitModule } from './units/units.module';
import { SessionsModule } from './sessions/sessions.module';
import { LessonsModule } from './lessons/lessons.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { LessonProgressModule } from './lesson-progress/lesson-progress.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env global
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Admin, User],
      synchronize: true,
    }),
    AdminModule,
    UserModule,
    AuthModule,
    CourseModule,
    UnitModule,
    SessionsModule,
    LessonsModule,
    EnrollmentsModule,
    LessonProgressModule,
    ReviewsModule,
  ],
})
export class AppModule {}
