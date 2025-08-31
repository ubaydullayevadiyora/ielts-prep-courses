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
import { UnitService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Units')
@Controller('units')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @Roles('admin', 'teacher') // 👈 admin va teacher qo‘shadi
  @ApiOperation({ summary: 'Create a new unit' })
  create(@Body() dto: CreateUnitDto) {
    return this.unitService.create(dto);
  }

  @Get()
  @Roles('admin', 'teacher', 'student') // 👈 hammaga ruxsat
  @ApiOperation({ summary: 'Get all units' })
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'teacher', 'student') // 👈 hammaga ruxsat
  @ApiOperation({ summary: 'Get a single unit by ID' })
  findOne(@Param('id') id: number) {
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin', 'teacher') // 👈 faqat admin va teacher update qiladi
  @ApiOperation({ summary: 'Update a unit by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateUnitDto) {
    return this.unitService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin') // 👈 faqat admin delete qiladi
  @ApiOperation({ summary: 'Delete a unit by ID' })
  remove(@Param('id') id: number) {
    return this.unitService.remove(+id);
  }
}
