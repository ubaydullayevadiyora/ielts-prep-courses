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
import { SessionModule } from './sessions/sessions.module';
import { LessonModule } from './lessons/lessons.module';
import { EnrollmentModule } from './enrollments/enrollments.module';
import { LessonProgressModule } from './lesson-progress/lesson-progress.module';
import { ReviewModule } from './reviews/reviews.module';
import { Course } from './courses/entities/course.entity';
import { Lesson } from './lessons/entities/lesson.entity';
import { Session } from './sessions/entities/session.entity';
import { LessonProgress } from './lesson-progress/entities/lesson-progress.entity';
import { Review } from './reviews/entities/review.entity';
import { Unit } from './units/entities/unit.entity';
import { Enrollment } from './enrollments/entities/enrollment.entity';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env global
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      entities: [Admin, User, Course, Lesson, Session, LessonProgress, Review, Unit, Enrollment],
      synchronize: true,
    }),
    AdminModule,
    UserModule,
    AuthModule,
    CourseModule,
    UnitModule,
    SessionModule,
    LessonModule,
    EnrollmentModule,
    LessonProgressModule,
    ReviewModule,
    MaterialsModule,
  ],
})
export class AppModule {}
