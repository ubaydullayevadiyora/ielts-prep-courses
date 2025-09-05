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
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Courses')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles('admin') 
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Get all courses' })
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user') 
  @ApiOperation({ summary: 'Get a single course by ID' })
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin') 
  @ApiOperation({ summary: 'Update a course by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a course by ID' })
  remove(@Param('id') id: number) {
    return this.courseService.remove(+id);
  }
}
