import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Unit } from '../../units/entities/unit.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Unit, (unit) => unit.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'unit_id' })
  @ApiProperty({ type: () => Unit })
  unit: Unit;

  @Column()
  @ApiProperty({ example: 'Session 1: Basics of English Grammar' })
  title: string;

  @Column()
  @ApiProperty({ example: 1 })
  order_number: number;

  @OneToMany(() => Lesson, (lesson) => lesson.session)
  @ApiProperty({ type: () => [Lesson] })
  lessons: Lesson[];
}
