import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Session } from '../sessions/entities/session.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async create(dto: CreateLessonDto): Promise<Lesson> {
    const session = await this.sessionRepository.findOne({
      where: { id: dto.session_id },
    });
    if (!session)
      throw new NotFoundException(
        `Session with id ${dto.session_id} not found`,
      );

    const lesson = this.lessonRepository.create({
      title: dto.title,
      order_number: dto.order_number,
      session,
    });

    return await this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find({ relations: ['session'] });
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: ['session'],
    });
    if (!lesson) throw new NotFoundException(`Lesson with id ${id} not found`);
    return lesson;
  }

  async update(id: number, dto: UpdateLessonDto): Promise<Lesson> {
    const lesson = await this.findOne(id);

    if (dto.session_id) {
      const session = await this.sessionRepository.findOne({
        where: { id: dto.session_id },
      });
      if (!session)
        throw new NotFoundException(
          `Session with id ${dto.session_id} not found`,
        );
      lesson.session = session;
    }

    if (dto.title) lesson.title = dto.title;
    if (dto.order_number !== undefined) lesson.order_number = dto.order_number;

    return await this.lessonRepository.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
