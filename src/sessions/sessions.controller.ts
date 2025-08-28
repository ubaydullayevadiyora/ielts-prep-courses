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
import { SessionService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session' })
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sessions' })
  findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single session by ID' })
  findOne(@Param('id') id: number) {
    return this.sessionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateSessionDto) {
    return this.sessionService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session by ID' })
  remove(@Param('id') id: number) {
    return this.sessionService.remove(+id);
  }
}
