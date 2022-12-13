import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/create')
  async create(@Body() createTagDto: CreateCategoriesDto) {
    return this.categoryService.create(createTagDto);
  }

  @Get('/all')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTagDto: UpdateCategoriesDto,
  ) {
    return this.categoryService.update(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
