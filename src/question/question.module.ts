import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])], 
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [TypeOrmModule], 
})
export class QuestionModule {}
