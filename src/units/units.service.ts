import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(dto: CreateUnitDto): Promise<Unit> {
    const course = await this.courseRepository.findOne({
      where: { id: dto.course_id },
    });
    if (!course)
      throw new NotFoundException(`Course with id ${dto.course_id} not found`);

    const unit = this.unitRepository.create({
      title: dto.title,
      order_number: dto.order_number,
      course,
    });

    return await this.unitRepository.save(unit);
  }

  async findAll(): Promise<Unit[]> {
    return await this.unitRepository.find({ relations: ['course'] });
  }

  async findOne(id: number): Promise<Unit> {
    const unit = await this.unitRepository.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!unit) throw new NotFoundException(`Unit with id ${id} not found`);
    return unit;
  }

  async update(id: number, dto: UpdateUnitDto): Promise<Unit> {
    const unit = await this.findOne(id);

    if (dto.course_id) {
      const course = await this.courseRepository.findOne({
        where: { id: dto.course_id },
      });
      if (!course)
        throw new NotFoundException(
          `Course with id ${dto.course_id} not found`,
        );
      unit.course = course;
    }

    if (dto.title) unit.title = dto.title;
    if (dto.order_number !== undefined) unit.order_number = dto.order_number;

    return await this.unitRepository.save(unit);
  }

  async remove(id: number): Promise<void> {
    const unit = await this.findOne(id);
    await this.unitRepository.remove(unit);
  }
}
