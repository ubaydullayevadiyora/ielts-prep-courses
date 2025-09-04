import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { TestService } from '../test-content/test-content.service';
import { OptionService } from '../option/option.service';
import { Test } from '../test-content/entities/test-content.entity';
import { Option } from '../option/entities/option.entity';
import { Material } from '../materials/entities/material.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Test, Option, Material]), // barcha entity lar
  ],
  controllers: [QuestionController],
  providers: [QuestionService, TestService, OptionService], // barcha repository lar
  exports: [QuestionService],
})
export class QuestionModule {}
