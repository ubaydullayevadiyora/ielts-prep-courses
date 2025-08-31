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
import { LessonService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Lessons')
@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard) // 👈 barcha endpointlarga qo'llanadi
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Roles('admin', 'teacher') // 👈 dars yaratish faqat admin va teacher uchun
  @ApiOperation({ summary: 'Create a new lesson' })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonService.create(dto);
  }

  @Get()
  @Roles('admin', 'teacher', 'student') // 👈 hammaga ruxsat
  @ApiOperation({ summary: 'Get all lessons' })
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'teacher', 'student') // 👈 hammaga ruxsat
  @ApiOperation({ summary: 'Get a single lesson by ID' })
  findOne(@Param('id') id: number) {
    return this.lessonService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'teacher') // 👈 faqat admin va teacher o'zgartiradi
  @ApiOperation({ summary: 'Update a lesson by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateLessonDto) {
    return this.lessonService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin') // 👈 faqat admin o‘chiradi
  @ApiOperation({ summary: 'Delete a lesson by ID' })
  remove(@Param('id') id: number) {
    return this.lessonService.remove(+id);
  }
}
