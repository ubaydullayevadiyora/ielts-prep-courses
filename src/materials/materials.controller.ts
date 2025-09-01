import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@ApiTags('Materials') // Swagger tag nomi
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new material' })
  @ApiResponse({ status: 201, description: 'Material successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiBody({ type: CreateMaterialDto })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all materials' })
  @ApiResponse({ status: 200, description: 'List of materials returned' })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get material by ID' })
  @ApiResponse({ status: 200, description: 'Material found' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update material by ID' })
  @ApiResponse({ status: 200, description: 'Material successfully updated' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMaterialDto })
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete material by ID' })
  @ApiResponse({ status: 200, description: 'Material successfully deleted' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}
