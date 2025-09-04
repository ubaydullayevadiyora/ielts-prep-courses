import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Test } from '../../test-content/entities/test-content.entity';
import { Option } from '../../option/entities/option.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Test, (test) => test.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test_id' })
  @ApiProperty({ type: () => Test })
  test: Test;

  @Column()
  @ApiProperty({ example: 'What is the capital of England?' })
  question_text: string;

  @Column()
  @ApiProperty({ example: 1 })
  order_number: number;

  @OneToMany(() => Option, (option) => option.question)
  @ApiProperty({ type: () => [Option] })
  options: Option[];
}
