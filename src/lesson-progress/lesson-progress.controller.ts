import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Lesson Progress')
@Controller('lessons-progress')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson progress' })
  create(@Body() dto: CreateLessonProgressDto) {
    return this.lessonProgressService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lesson progress' })
  findAll() {
    return this.lessonProgressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single lesson progress by ID' })
  findOne(@Param('id') id: number) {
    return this.lessonProgressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lesson progress by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateLessonProgressDto) {
    return this.lessonProgressService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson progress by ID' })
  remove(@Param('id') id: number) {
    return this.lessonProgressService.remove(+id);
  }
}
