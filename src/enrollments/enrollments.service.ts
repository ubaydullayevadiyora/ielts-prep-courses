import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(dto: CreateEnrollmentDto): Promise<Enrollment> {
    const user = await this.userRepository.findOne({
      where: { id: dto.user_id },
    });
    if (!user)
      throw new NotFoundException(`User with id ${dto.user_id} not found`);

    const course = await this.courseRepository.findOne({
      where: { id: dto.course_id },
    });
    if (!course)
      throw new NotFoundException(`Course with id ${dto.course_id} not found`);

    const enrollment = this.enrollmentRepository.create({
      user,
      course,
      start_date: dto.start_date,
      end_date: dto.end_date,
      progress: dto.progress,
    });

    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      relations: ['user', 'course'],
    });
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!enrollment)
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    return enrollment;
  }

  async update(id: number, dto: UpdateEnrollmentDto): Promise<Enrollment> {
    const enrollment = await this.findOne(id);

    if (dto.user_id) {
      const user = await this.userRepository.findOne({
        where: { id: dto.user_id },
      });
      if (!user)
        throw new NotFoundException(`User with id ${dto.user_id} not found`);
      enrollment.user = user;
    }

    if (dto.course_id) {
      const course = await this.courseRepository.findOne({
        where: { id: dto.course_id },
      });
      if (!course)
        throw new NotFoundException(
          `Course with id ${dto.course_id} not found`,
        );
      enrollment.course = course;
    }

    if (dto.start_date) enrollment.start_date = dto.start_date;
    if (dto.end_date) enrollment.end_date = dto.end_date;
    if (dto.progress !== undefined) enrollment.progress = dto.progress;

    return await this.enrollmentRepository.save(enrollment);
  }

  async remove(id: number): Promise<void> {
    const enrollment = await this.findOne(id);
    await this.enrollmentRepository.remove(enrollment);
  }
}
