import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  level: string;

  @Column({ default: 0 })
  @ApiProperty()
  progress: number;

  @Column()
  @ApiProperty()
  status: string;

  @Column()
  @ApiProperty()
  weeks: number;

  @Column()
  @ApiProperty()
  duration: number; // months_access

  @Column({ type: 'float', default: 0 })
  @ApiProperty()
  rating: number;

  @Column()
  @ApiProperty()
  lang: string;
}
