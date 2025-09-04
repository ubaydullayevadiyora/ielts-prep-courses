import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';

@ApiTags('Materials')
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiOperation({
    summary: 'Upload and create a new material (video, audio, test, etc.)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Material data with optional file upload',
    type: CreateMaterialDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Material successfully created',
    type: Material,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + file.originalname;
          cb(null, unique);
        },
      }),
    }),
  )
  create(
    @Body() createMaterialDto: CreateMaterialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.materialsService.create(createMaterialDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of all materials' })
  @ApiResponse({
    status: 200,
    description: 'List of materials',
    type: [Material],
  })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a material by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Material ID' })
  @ApiResponse({ status: 200, description: 'Material found', type: Material })
  @ApiResponse({ status: 404, description: 'Material not found' })
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a material by its ID (can also upload new file)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number, description: 'Material ID' })
  @ApiBody({ description: 'Updated material data', type: UpdateMaterialDto })
  @ApiResponse({
    status: 200,
    description: 'Material successfully updated',
    type: Material,
  })
  @ApiResponse({ status: 404, description: 'Material not found' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + file.originalname;
          cb(null, unique);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.materialsService.update(+id, updateMaterialDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a material by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Material ID' })
  @ApiResponse({ status: 200, description: 'Material successfully deleted' })
  @ApiResponse({ status: 404, description: 'Material not found' })
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
}
