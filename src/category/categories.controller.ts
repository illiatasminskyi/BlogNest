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
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @Post('/create')
  async create(@Body() createTagDto: CreateCategoriesDto) {
    return this.categoryService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTagDto: UpdateCategoriesDto,
  ) {
    return this.categoryService.update(id, updateTagDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
