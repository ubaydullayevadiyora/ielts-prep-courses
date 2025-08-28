import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('lessons_progress')
export class LessonProgress {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Enrollment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollment_id' })
  @ApiProperty({ type: () => Enrollment })
  enrollment: Enrollment;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  @ApiProperty({ type: () => Lesson })
  lesson: Lesson;

  @Column()
  @ApiProperty()
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ nullable: true })
  completed_at: Date | null;
}
