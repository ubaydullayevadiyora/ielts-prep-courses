import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  @ApiProperty({ type: () => Question })
  question: Question;

  @Column()
  @ApiProperty({ example: 'London' })
  option_text: string;

  @Column({ default: false })
  @ApiProperty({ example: true, description: 'True if this option is correct' })
  is_correct: boolean;
}
