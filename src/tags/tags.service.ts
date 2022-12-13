import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly repo: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    const tag = this.repo.create(createTagDto);
    return this.repo.save(tag);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const tag = await this.repo.findOne({ where: { id } });
    if (!tag) return { message: `Not found tag id ${id}` };
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.repo.update(id, updateTagDto);
    const tag = await this.repo.findOne({ where: { id } });
    if (!tag) return { message: `Not found tag id ${id}` };
    return tag;
  }

  async remove(id: number) {
    const tag = await this.repo.findOne({ where: { id } });
    if (!tag) return { message: `Not found tag id ${id}` };
    return await this.repo.delete(id);
  }
}
