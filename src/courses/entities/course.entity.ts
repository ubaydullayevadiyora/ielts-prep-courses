import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Unit } from '../../units/entities/unit.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column()
  @ApiProperty({ example: 'English for Beginners' })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'This course covers the basics of English grammar.' })
  description: string;

  @Column()
  @ApiProperty({ example: 'Beginner' })
  level: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0 })
  progress: number;

  @Column({ default: 0 })
  @ApiProperty({ example: 10, description: 'Total lessons in the course' })
  lessons: number;

  @Column()
  @ApiProperty({ example: 'active' })
  status: string;

  @Column()
  @ApiProperty({ example: 6, description: 'Months of access after purchase' })
  month_access: number;

  @Column()
  @ApiProperty({ example: 90, description: 'Duration in minutes or hours' })
  duration: number;

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 4.5 })
  rating: number;

  @OneToMany(() => Unit, (unit) => unit.course, { cascade: true })
  @ApiProperty({ type: () => [Unit] })
  units: Unit[];
}
