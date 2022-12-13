import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  @Post('/create')
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get('/all')
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.tagsService.remove(id);
  }
}
