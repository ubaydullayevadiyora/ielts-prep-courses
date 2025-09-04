import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { CreateTestDto } from './dto/create-test-content.dto';
import { UpdateTestContentDto } from './dto/update-test-content.dto';
import { Material } from '../materials/entities/material.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  // CREATE
  async create(createTestDto: CreateTestDto): Promise<Test> {
    const { material_id, title, description } = createTestDto;

    const material = await this.materialRepository.findOne({
      where: { id: material_id },
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${material_id} not found`);
    }

    const test = this.testRepository.create({
      title,
      description,
      material,
    });

    return this.testRepository.save(test);
  }

  // FIND ALL
  async findAll(): Promise<Test[]> {
    return this.testRepository.find({
      relations: ['material', 'questions', 'questions.options'],
    });
  }

  // FIND ONE
  async findOne(id: number): Promise<Test> {
    const test = await this.testRepository.findOne({
      where: { id },
      relations: ['material', 'questions', 'questions.options'],
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  // UPDATE
  async update(id: number, updateTestDto: UpdateTestContentDto): Promise<Test> {
    const test = await this.findOne(id);

    Object.assign(test, updateTestDto);

    return this.testRepository.save(test);
  }

  // REMOVE
  async remove(id: number): Promise<{ message: string }> {
    const test = await this.findOne(id);
    await this.testRepository.remove(test);

    return { message: `Test with ID ${id} has been removed` };
  }
}
