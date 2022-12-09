import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './categories.controller';
import { Categorys } from './categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categorys])],
  controllers: [CategoryController],
})
export class CategoryModule {}
