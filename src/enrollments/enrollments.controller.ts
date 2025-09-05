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
import { EnrollmentService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';


@ApiTags('Enrollments')
@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @Roles('admin') 
  @ApiOperation({ summary: 'Create a new enrollment' })
  create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentService.create(dto);
  }

  @Get()
  @Roles('admin', 'user') 
  @ApiOperation({ summary: 'Get all enrollments' })
  findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user') 
  @ApiOperation({ summary: 'Get a single enrollment by ID' })
  findOne(@Param('id') id: number) {
    return this.enrollmentService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin') 
  @ApiOperation({ summary: 'Update an enrollment by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateEnrollmentDto) {
    return this.enrollmentService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin') 
  @ApiOperation({ summary: 'Delete an enrollment by ID' })
  remove(@Param('id') id: number) {
    return this.enrollmentService.remove(+id);
  }
}
