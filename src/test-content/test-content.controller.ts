import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestContentService } from './test-content.service';
import { CreateTestContentDto } from './dto/create-test-content.dto';
import { UpdateTestContentDto } from './dto/update-test-content.dto';

@Controller('test-content')
export class TestContentController {
  constructor(private readonly testContentService: TestContentService) {}

  @Post()
  create(@Body() createTestContentDto: CreateTestContentDto) {
    return this.testContentService.create(createTestContentDto);
  }

  @Get()
  findAll() {
    return this.testContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testContentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestContentDto: UpdateTestContentDto) {
    return this.testContentService.update(+id, updateTestContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testContentService.remove(+id);
  }
}
