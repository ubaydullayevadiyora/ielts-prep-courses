import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const user = await this.userRepository.findOne({
      where: { id: dto.user_id },
    });
    if (!user)
      throw new NotFoundException(`User with id ${dto.user_id} not found`);

    const course = await this.courseRepository.findOne({
      where: { id: dto.course_id },
    });
    if (!course)
      throw new NotFoundException(`Course with id ${dto.course_id} not found`);

    const review = this.reviewRepository.create({
      user,
      course,
      rating: dto.rating,
      comment: dto.comment,
    });

    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find({ relations: ['user', 'course'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!review) throw new NotFoundException(`Review with id ${id} not found`);
    return review;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);

    if (dto.user_id) {
      const user = await this.userRepository.findOne({
        where: { id: dto.user_id },
      });
      if (!user)
        throw new NotFoundException(`User with id ${dto.user_id} not found`);
      review.user = user;
    }

    if (dto.course_id) {
      const course = await this.courseRepository.findOne({
        where: { id: dto.course_id },
      });
      if (!course)
        throw new NotFoundException(
          `Course with id ${dto.course_id} not found`,
        );
      review.course = course;
    }

    if (dto.rating !== undefined) review.rating = dto.rating;
    if (dto.comment) review.comment = dto.comment;

    return await this.reviewRepository.save(review);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
  }
}
