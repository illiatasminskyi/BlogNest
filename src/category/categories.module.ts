import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './categories.controller';
import { Categories } from './categories.entity';
import { CategoryService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
