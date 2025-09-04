import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from './entities/option.entity';

@ApiTags('Options')
@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new option' })
  @ApiResponse({
    status: 201,
    description: 'The option has been successfully created.',
    type: Option,
  })
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all options' })
  @ApiResponse({
    status: 200,
    description: 'List of all options with related questions.',
    type: [Option],
  })
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get option by ID' })
  @ApiResponse({
    status: 200,
    description: 'The option with the given ID.',
    type: Option,
  })
  @ApiResponse({ status: 404, description: 'Option not found' })
  findOne(@Param('id') id: string) {
    return this.optionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an option' })
  @ApiResponse({
    status: 200,
    description: 'The option has been successfully updated.',
    type: Option,
  })
  @ApiResponse({ status: 404, description: 'Option not found' })
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an option' })
  @ApiResponse({
    status: 200,
    description: 'The option has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Option not found' })
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}
