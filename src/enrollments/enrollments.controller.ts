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
import { EnrollmentService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new enrollment' })
  create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single enrollment by ID' })
  findOne(@Param('id') id: number) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an enrollment by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an enrollment by ID' })
  remove(@Param('id') id: number) {
    return this.enrollmentService.remove(+id);
  }
}
