import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

export enum MaterialType {
  VIDEO = 'video',
  AUDIO = 'audio',
  TEXT = 'text',
  PDF = 'pdf',
  TEST = 'test',
}

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.materials, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: MaterialType,
  })
  type: MaterialType;

  @Column({ nullable: true })
  url?: string;

  @Column({ default: 1 })
  order_number: number;
}
