import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { MaterialsService } from './materials.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialsService],
  exports: [MaterialsService], // boshqa modullarda ishlatish uchun
})
export class MaterialsModule {}
