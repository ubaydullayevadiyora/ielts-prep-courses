import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonProgress } from './entities/lesson-progress.entity';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';
import { Enrollment } from '../enrollments/entities/enrollment.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Injectable()
export class LessonProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: Repository<LessonProgress>,
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create(dto: CreateLessonProgressDto): Promise<LessonProgress> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id: dto.enrollment_id },
    });
    if (!enrollment)
      throw new NotFoundException(
        `Enrollment with id ${dto.enrollment_id} not found`,
      );

    const lesson = await this.lessonRepository.findOne({
      where: { id: dto.lesson_id },
    });
    if (!lesson)
      throw new NotFoundException(`Lesson with id ${dto.lesson_id} not found`);

    const lessonProgress = this.lessonProgressRepository.create({
      enrollment,
      lesson,
      status: dto.status,
      completed_at: dto.completed_at ? new Date(dto.completed_at) : null,
    });

    return await this.lessonProgressRepository.save(lessonProgress);
  }

  async findAll(): Promise<LessonProgress[]> {
    return await this.lessonProgressRepository.find({
      relations: ['enrollment', 'lesson'],
    });
  }

  async findOne(id: number): Promise<LessonProgress> {
    const progress = await this.lessonProgressRepository.findOne({
      where: { id },
      relations: ['enrollment', 'lesson'],
    });
    if (!progress)
      throw new NotFoundException(`Lesson progress with id ${id} not found`);
    return progress;
  }

  async update(
    id: number,
    dto: UpdateLessonProgressDto,
  ): Promise<LessonProgress> {
    const progress = await this.findOne(id);

    if (dto.enrollment_id) {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id: dto.enrollment_id },
      });
      if (!enrollment)
        throw new NotFoundException(
          `Enrollment with id ${dto.enrollment_id} not found`,
        );
      progress.enrollment = enrollment;
    }

    if (dto.lesson_id) {
      const lesson = await this.lessonRepository.findOne({
        where: { id: dto.lesson_id },
      });
      if (!lesson)
        throw new NotFoundException(
          `Lesson with id ${dto.lesson_id} not found`,
        );
      progress.lesson = lesson;
    }

    if (dto.status) progress.status = dto.status;
    if (dto.completed_at) progress.completed_at = new Date(dto.completed_at);

    return await this.lessonProgressRepository.save(progress);
  }

  async remove(id: number): Promise<void> {
    const progress = await this.findOne(id);
    await this.lessonProgressRepository.remove(progress);
  }
}
