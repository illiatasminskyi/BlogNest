import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Posts } from 'src/posts/posts.entity';
import slugify from 'slugify';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly repo: Repository<Tag>) {}

  create(createTagDto: CreateTagDto) {
    const tag = this.repo.create(createTagDto);
    const { title, ...data } = tag;
    const slug = slugify(title, {
      replacement: '_',
      lower: true,
    });
    const tagRes = {
      title: slug,
      ...data,
    };
    return this.repo.save(tagRes);
  }

  findAll() {
    return this.repo.find({
      relations: {
        posts: true,
      },
    });
  }

  async findOne(id: number) {
    const tag = await this.repo.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });
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
