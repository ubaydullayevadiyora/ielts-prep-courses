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
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';

@ApiTags('Reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Roles('user', 'admin') // oddiy foydalanuvchi ham, admin ham review qila oladi
  @ApiOperation({ summary: 'Create a new review' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get()
  @Roles('admin', 'user') // hammaga ruxsat
  @ApiOperation({ summary: 'Get all reviews' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user') // hammaga ruxsat
  @ApiOperation({ summary: 'Get a single review by ID' })
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  @Roles('user', 'admin') // faqat o‘z reviewini foydalanuvchi update qiladi, admin esa hammasini
  @ApiOperation({ summary: 'Update a review by ID' })
  update(@Param('id') id: number, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles('admin') // faqat admin o‘chiradi
  @ApiOperation({ summary: 'Delete a review by ID' })
  remove(@Param('id') id: number) {
    return this.reviewService.remove(+id);
  }
}
