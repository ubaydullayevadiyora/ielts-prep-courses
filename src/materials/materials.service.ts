import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(
    createMaterialDto: CreateMaterialDto,
    file?: Express.Multer.File,
  ): Promise<Material> {
    const material = this.materialRepository.create({
      ...createMaterialDto,
      url: file ? `/uploads/${file.filename}` : createMaterialDto.url,
    });
    return await this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return await this.materialRepository.find({ relations: ['lesson'] });
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['lesson'],
    });
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async update(
    id: number,
    updateMaterialDto: UpdateMaterialDto,
    file?: Express.Multer.File,
  ): Promise<Material> {
    const material = await this.findOne(id);

    const updated: Material = Object.assign(material, updateMaterialDto);
    if (file) {
      updated.url = `/uploads/${file.filename}`;
    }

    return await this.materialRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const material = await this.findOne(id);
    await this.materialRepository.remove(material);
  }
}
