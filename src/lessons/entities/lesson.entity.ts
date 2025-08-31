import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';
import { Material } from '../../materials/entities/material.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Session, (session) => session.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  @ApiProperty({ type: () => Session })
  session: Session;

  @Column()
  @ApiProperty({ example: 'Lesson 1: Introduction to IELTS' })
  title: string;

  @Column()
  @ApiProperty({ example: 1 })
  order_number: number;

  @OneToMany(() => Material, (material) => material.lesson)
  @ApiProperty({ type: () => [Material] })
  materials: Material[];
}
