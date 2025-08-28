import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

//   RELATION
  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  @ApiProperty({ type: () => Course })
  course: Course;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  order_number: number;
}
