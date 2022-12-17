import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-tag.dto';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly repo: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.repo.create(createPostDto);
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.repo.update(id, updatePostDto);
    const post = await this.repo.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return post;
  }

  async remove(id: number) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) return { message: `Not found post id ${id}` };
    return await this.repo.delete(id);
  }
}
