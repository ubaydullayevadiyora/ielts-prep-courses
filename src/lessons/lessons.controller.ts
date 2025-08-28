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
import { LessonService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single lesson by ID' })
  findOne(@Param('id') id: number) {
    return this.lessonService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lesson by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateLessonDto) {
    return this.lessonService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson by ID' })
  remove(@Param('id') id: number) {
    return this.lessonService.remove(+id);
  }
}
