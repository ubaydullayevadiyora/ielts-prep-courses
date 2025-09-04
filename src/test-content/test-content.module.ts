import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test-content.service';
import { TestContentController } from './test-content.controller';
import { Test } from './entities/test-content.entity';
import { MaterialsModule } from '../materials/materials.module';
import { Material } from '../materials/entities/material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Material]),
    
  ],
  controllers: [TestContentController],
  providers: [TestService],
  exports: [TestService],
})
export class TestContentModule {}
