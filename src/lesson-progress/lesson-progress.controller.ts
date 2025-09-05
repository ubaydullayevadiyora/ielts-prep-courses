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
  UseGuards,
} from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Lesson Progress')
@Controller('lessons-progress')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  @Post()
  @Roles('admin') 
  @ApiOperation({ summary: 'Create a new lesson progress' })
  create(@Body() dto: CreateLessonProgressDto) {
    return this.lessonProgressService.create(dto);
  }

  @Get()
  @Roles('admin') 
  @ApiOperation({ summary: 'Get all lesson progress' })
  findAll() {
    return this.lessonProgressService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user') 
  @ApiOperation({ summary: 'Get a single lesson progress by ID' })
  findOne(@Param('id') id: number) {
    return this.lessonProgressService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin') 
  @ApiOperation({ summary: 'Update a lesson progress by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateLessonProgressDto) {
    return this.lessonProgressService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin') 
  @ApiOperation({ summary: 'Delete a lesson progress by ID' })
  remove(@Param('id') id: number) {
    return this.lessonProgressService.remove(+id);
  }
}
