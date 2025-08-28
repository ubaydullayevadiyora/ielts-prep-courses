import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({ type: () => Course })
  course: Course;

  @Column({ type: 'date' })
  @ApiProperty()
  start_date: string;

  @Column({ type: 'date' })
  @ApiProperty()
  end_date: string;

  @Column({ type: 'int', default: 0 })
  @ApiProperty()
  progress: number;
}
