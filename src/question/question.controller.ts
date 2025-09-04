import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Question } from './entities/question.entity';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question for a material (test)' })
  @ApiResponse({
    status: 201,
    description: 'Question successfully created',
    type: Question,
  })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({
    status: 200,
    description: 'List of all questions',
    type: [Question],
  })
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'The found question',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing question' })
  @ApiParam({ name: 'id', type: Number, description: 'Question ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated question',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({ name: 'id', type: Number, description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question has been deleted' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
