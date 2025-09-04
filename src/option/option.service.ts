import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  // CREATE
  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    const { question_id, option_text, is_correct } = createOptionDto;

    const question = await this.questionRepository.findOne({
      where: { id: question_id },
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${question_id} not found`);
    }

    const option = this.optionRepository.create({
      option_text,
      is_correct,
      question,
    });

    return this.optionRepository.save(option);
  }

  // FIND ALL
  async findAll(): Promise<Option[]> {
    return this.optionRepository.find({ relations: ['question'] });
  }

  // FIND ONE
  async findOne(id: number): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['question'],
    });
    if (!option) {
      throw new NotFoundException(`Option with ID ${id} not found`);
    }
    return option;
  }

  // UPDATE
  async update(id: number, updateOptionDto: UpdateOptionDto): Promise<Option> {
    const option = await this.findOne(id);

    Object.assign(option, updateOptionDto);

    return this.optionRepository.save(option);
  }

  // REMOVE
  async remove(id: number): Promise<{ message: string }> {
    const option = await this.findOne(id);
    await this.optionRepository.remove(option);

    return { message: `Option with ID ${id} has been removed` };
  }
}
