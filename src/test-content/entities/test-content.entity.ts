import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Material } from '../../materials/entities/material.entity';
import { Question } from '../../question/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @OneToOne(() => Material, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'material_id' })
  @ApiProperty({ type: () => Material })
  material: Material;

  @Column()
  @ApiProperty({ example: 'IELTS Listening Practice Test 1' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ example: 'This test covers basic listening skills.' })
  description?: string;

  @OneToMany(() => Question, (question) => question.test)
  @ApiProperty({ type: () => [Question] })
  questions: Question[];
}
