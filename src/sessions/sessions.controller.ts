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
import { SessionService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Sessions')
@Controller('sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Roles('admin') //session faqat admin yaratadi
  @ApiOperation({ summary: 'Create a new session' })
  create(@Body() dto: CreateSessionDto) {
    return this.sessionService.create(dto);
  }

  @Get()
  @Roles('admin', 'user') // hammaga ruxsat
  @ApiOperation({ summary: 'Get all sessions' })
  findAll() {
    return this.sessionService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user') //hammaga ruxsat
  @ApiOperation({ summary: 'Get a single session by ID' })
  findOne(@Param('id') id: number) {
    return this.sessionService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin') // faqat adminupdate qiladi
  @ApiOperation({ summary: 'Update a session by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateSessionDto) {
    return this.sessionService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin') // faqat admin o‘chiradi
  @ApiOperation({ summary: 'Delete a session by ID' })
  remove(@Param('id') id: number) {
    return this.sessionService.remove(+id);
  }
}
