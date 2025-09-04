import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Test } from '../test-content/entities/test-content.entity';
import { Option } from '../option/entities/option.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  // CREATE
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { test_id, question_text, order_number, options } = createQuestionDto;

    const test = await this.testRepository.findOne({ where: { id: test_id } });
    if (!test) {
      throw new NotFoundException(`Test with ID ${test_id} not found`);
    }

    // Savol yaratish
    const question = this.questionRepository.create({
      question_text,
      order_number,
      test,
    });
    const savedQuestion = await this.questionRepository.save(question);

    // Variantlarni yaratish
    const optionEntities = options.map((opt) =>
      this.optionRepository.create({
        // Use the correct property name as defined in Option entity, e.g., 'text'
        option_text: opt.text,
        is_correct: Boolean(opt.is_correct),
        question: savedQuestion,
      }),
    );
    await this.optionRepository.save(optionEntities);

    // options bilan qaytarish
    const foundQuestion = await this.questionRepository.findOne({
      where: { id: savedQuestion.id },
      relations: ['options', 'test'],
    });
    if (!foundQuestion) {
      throw new NotFoundException(`Question with ID ${savedQuestion.id} not found`);
    }
    return foundQuestion;
  }

  // FIND ALL
  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['options', 'test'] });
  }

  // FIND ONE
  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['options', 'test'],
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  // UPDATE
  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOne(id);

    Object.assign(question, updateQuestionDto);

    return this.questionRepository.save(question);
  }

  // REMOVE
  async remove(id: number): Promise<{ message: string }> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);

    return { message: `Question with ID ${id} has been removed` };
  }
}
