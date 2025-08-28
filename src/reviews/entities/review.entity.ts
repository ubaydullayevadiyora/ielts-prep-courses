import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reviews')
export class Review {
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

  @Column({ type: 'int' })
  @ApiProperty()
  rating: number;

  @Column({ type: 'text' })
  @ApiProperty()
  comment: string;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;
}
