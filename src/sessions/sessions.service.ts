import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Unit } from '../units/entities/unit.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  async create(dto: CreateSessionDto): Promise<Session> {
    const unit = await this.unitRepository.findOne({
      where: { id: dto.unit_id },
    });
    if (!unit)
      throw new NotFoundException(`Unit with id ${dto.unit_id} not found`);

    const session = this.sessionRepository.create({
      title: dto.title,
      order_number: dto.order_number,
      unit,
    });

    return await this.sessionRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find({ relations: ['unit'] });
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['unit'],
    });
    if (!session)
      throw new NotFoundException(`Session with id ${id} not found`);
    return session;
  }

  async update(id: number, dto: UpdateSessionDto): Promise<Session> {
    const session = await this.findOne(id);

    if (dto.unit_id) {
      const unit = await this.unitRepository.findOne({
        where: { id: dto.unit_id },
      });
      if (!unit)
        throw new NotFoundException(`Unit with id ${dto.unit_id} not found`);
      session.unit = unit;
    }

    if (dto.title) session.title = dto.title;
    if (dto.order_number !== undefined) session.order_number = dto.order_number;

    return await this.sessionRepository.save(session);
  }

  async remove(id: number): Promise<void> {
    const session = await this.findOne(id);
    await this.sessionRepository.remove(session);
  }
}
