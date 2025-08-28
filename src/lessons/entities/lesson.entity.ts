import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => Session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  @ApiProperty({ type: () => Session })
  session: Session;

  @Column()
  @ApiProperty()
  title: string;

  @Column('text')
  @ApiProperty()
  content: string;

  @Column()
  @ApiProperty()
  order_number: number;
}
