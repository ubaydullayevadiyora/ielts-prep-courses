import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { TestService } from './test-content.service';
import { TestContentController } from './test-content.controller';
import { Material } from '../materials/entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Material])],
  controllers: [TestContentController],
  providers: [TestService],
  exports: [TestService], 
})
export class TestModule {}
