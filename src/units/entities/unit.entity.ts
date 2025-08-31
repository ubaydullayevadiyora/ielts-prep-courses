import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Session } from '../../sessions/entities/session.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Course, (course) => course.units, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({ type: () => Course })
  course: Course;

  @Column()
  @ApiProperty({ example: 'Unit 1: Introduction to English' })
  title: string;

  @Column()
  @ApiProperty({ example: 1 })
  order_number: number;

  @OneToMany(() => Session, (session) => session.unit)
  @ApiProperty({ type: () => [Session] })
  sessions: Session[];
}
